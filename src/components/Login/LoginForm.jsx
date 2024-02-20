import React, { useState } from "react";
import { InputName, InputStyle, LoginWrap, PageTitle, BtnBlackBg, BtnBlackText } from "./LoginStyles";

export default function LoginForm() {
  const [isJoin, setIsJoin] = useState(false);

  //회원가입 여부 state 토글 기능
  const toggleState = () => {
    setIsJoin((state) => !state);
  };

  return (
    <LoginWrap>
      <PageTitle>{isJoin ? "회원가입" : "로그인"}</PageTitle>
      <form>
        <InputName htmlFor="id">아이디</InputName>
        <InputStyle type="text" id="id" />
        <InputName htmlFor="password">비밀번호</InputName>
        <InputStyle type="password" id="password" />
        {isJoin ? (
          <></>
        ) : (
          <>
            <InputName htmlFor="passwordConfirm">비밀번호 확인</InputName>
            <InputStyle type="password" id="passwordConfirm" />
            <InputName htmlFor="nickname">닉네임</InputName>
            <InputStyle type="text" id="nickname" />
          </>
        )}

        <div>{isJoin ? <BtnBlackBg>회원가입</BtnBlackBg> : <BtnBlackBg>로그인</BtnBlackBg>}</div>
      </form>
      <BtnBlackText onClick={toggleState}>{isJoin ? "로그인" : "회원가입"}</BtnBlackText>
    </LoginWrap>
  );
}
