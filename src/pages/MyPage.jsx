import axios from "axios";
import { BtnBlackBg, BtnBlackText, BtnBox, FileLabelStyle, InputStyle, MyPageWrap, ThumbnailBox, UserIdText } from "components/MyPage/MyPageStyles";
import React, { useEffect, useRef, useState } from "react";
import api from "../axios/api";

export default function MyPage() {
  const accessToken = localStorage.getItem("accessToken");
  const localNickname = localStorage.getItem("nickname");
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false); //수정 상태
  const [nickname, setNickname] = useState(localNickname);
  const [isRendered, setIsRendered] = useState(false);
  const nicknameRef = useRef(null);

  const updateUser = async () => {
    try {
      const response = await api.patch(`${process.env.REACT_APP_SERVER_URL}/`);
    } catch (error) {}
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

  const handleSave = async () => {
    if (!nickname.trim()) {
      nicknameRef.current.focus();
      return alert("닉네임을 입력해주세요.");
    }
    if (localNickname === nickname) {
      return alert("변경 사항이 없습니다. 변경 후 다시 시도해주세요.");
    }
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
      } catch (error) {
        alert(error.response.data.message);
        console.error(error);
      }
    };
    setData();
    setIsRendered(true);
  }, []);

  if (!isRendered) {
    return <div>로딩중</div>;
  }

  return (
    <MyPageWrap>
      <FileLabelStyle>
        <ThumbnailBox>
          <img src={userInfo && userInfo.avatar} alt={`${userInfo && userInfo.nickname} 유저 프로필 이미지`} />
          <input type="file" />
        </ThumbnailBox>
      </FileLabelStyle>

      <label>
        <InputStyle type="text" id="nickname" value={nickname} ref={nicknameRef} onChange={handleChange} readOnly minLength="2" maxLength="10" />
      </label>
      <UserIdText>{userInfo && userInfo.id}</UserIdText>
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
