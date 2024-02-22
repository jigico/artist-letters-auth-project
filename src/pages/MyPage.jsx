import axios from "axios";
import { BtnBlackBg, BtnBlackText, BtnBlueBg, BtnBox, FileLabelStyle, InputStyle, MyPageWrap, ThumbnailBox, UserIdText } from "components/MyPage/MyPageStyles";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAsyncError, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { __editProfile } from "../redux/modules/authSlice";

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
  const [file, setFile] = useState(null);
  const [isRendered, setIsRendered] = useState(false);
  const nicknameRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //프로필 이미지 업로드
  const updateAvatar = async (avatar) => {
    const formData = new FormData();
    if (avatar !== localAvatar) {
      formData.append("avatar", file);
    }
    dispatch(__editProfile(formData));
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024) {
      return toast.warn("최대 1MB까지 업로드 가능합니다.");
    }
    setFile(file);
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setAvatar(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    //   setIsImgUpdate(true);
    // }

    //file -> blob url 형식으로 변환
    const imgUrl = URL.createObjectURL(file);
    setAvatar(imgUrl);
    setIsImgUpdate(true);
  };

  const handleImgCancel = () => {
    setAvatar(localAvatar);
    setIsImgUpdate(false);
  };

  const updateNickname = async () => {
    const formData = new FormData();
    if (nickname !== localNickname) {
      formData.append("nickname", nickname);
    }
    dispatch(__editProfile(formData));

    //수정상태 비활성화
    nicknameRef.current.readOnly = true;
    setIsEditing(false);
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
          <input type="file" onChange={handleImgChange} accept="image/*" />
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
