import axios from "axios";
import { BtnBlackBg, BtnBlackText, BtnBlueBg, BtnBox, FileLabelStyle, InputStyle, MyPageWrap, ThumbnailBox, UserIdText } from "components/MyPage/MyPageStyles";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const accessToken = localStorage.getItem("accessToken");
  const localNickname = localStorage.getItem("nickname");
  const localAvatar = localStorage.getItem("avatar");
  const id = localStorage.getItem("id");
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false); //수정 상태
  const [isImgUpdate, setIsImgUpdate] = useState(false); //수정 상태
  const [nickname, setNickname] = useState(localNickname);
  const [avatar, setAvatar] = useState(localAvatar);
  const [isRendered, setIsRendered] = useState(false);
  const nicknameRef = useRef(null);

  const navigate = useNavigate();

  //프로필 이미지 업로드
  const updateAvatar = async (avatar) => {
    console.log("avatar", avatar);
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/profile`,
        { avatar },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      localStorage.setItem("avatar", response.data.avatar);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
      console.error(error);
    }
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
      setIsImgUpdate(true);
    }
  };

  const handleImgCancel = () => {
    setAvatar(localAvatar);
    setIsImgUpdate(false);
  };

  const updateNickname = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/profile`,
        { nickname },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      setNickname(response.data.nickname);
      localStorage.setItem("nickname", response.data.nickname);
      alert(response.data.message);

      //수정상태 비활성화
      nicknameRef.current.readOnly = true;
      setIsEditing(false);
    } catch (error) {
      alert(error.response.data.message);
      console.error(error);
    }
  };

  //유저 정보(닉네임) 수정 - 활성화 기능
  const handleEdit = () => {
    nicknameRef.current.readOnly = false;
    nicknameRef.current.focus();
    setIsEditing(true);
  };

  //유저 정보(닉네임) 수정 취소 - 비활성화 기능
  const handleEditCancel = () => {
    setNickname(localNickname);
    nicknameRef.current.readOnly = true;
    setIsEditing(false);
  };

  //닉네임 변경
  const handleSave = async () => {
    if (!accessToken) {
      alert("로그인이 만료되었습니다. 로그인 화면으로 이동합니다.");
      return navigate("/login");
    }
    if (!nickname.trim()) {
      nicknameRef.current.focus();
      return alert("닉네임을 입력해주세요.");
    }
    if (localNickname === nickname) {
      return alert("변경 사항이 없습니다. 변경 후 다시 시도해주세요.");
    }

    updateNickname();
  };

  //닉네임 change
  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  useEffect(() => {
    const setData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        });
        setUserInfo(response.data);
        setData();
      } catch (error) {
        alert(error.response.data.message);
        console.error(error);
      }
    };
    setIsRendered(true);
  }, []);

  if (!isRendered) {
    return <div>로딩중</div>;
  }

  return (
    <MyPageWrap>
      <FileLabelStyle>
        <ThumbnailBox>
          <img src={avatar} alt={`${localNickname} 유저 프로필 이미지`} />
          <input type="file" onChange={handleImgChange} />
        </ThumbnailBox>
      </FileLabelStyle>
      {isImgUpdate && (
        <BtnBox>
          <BtnBlueBg onClick={() => updateAvatar(avatar)}>저장</BtnBlueBg>
          <BtnBlackText onClick={handleImgCancel}>취소</BtnBlackText>
        </BtnBox>
      )}
      <label>
        <InputStyle type="text" id="nickname" value={nickname} ref={nicknameRef} onChange={handleChange} readOnly minLength="2" maxLength="10" />
      </label>
      <UserIdText>{id}</UserIdText>
      <BtnBox>
        {isEditing ? (
          <>
            <BtnBlackBg onClick={handleSave}>저장</BtnBlackBg>
            <BtnBlackText onClick={handleEditCancel}>취소</BtnBlackText>
          </>
        ) : (
          <BtnBlackBg onClick={handleEdit}>수정</BtnBlackBg>
        )}
      </BtnBox>
    </MyPageWrap>
  );
}
