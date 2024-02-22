import React, { useRef, useState } from "react";
import { InputName, InputStyle, LoginWrap, PageTitle, BtnBlackBg, BtnBlackText, BtnArea } from "./LoginStyles";
import api from "../../axios/api";
import { useDispatch } from "react-redux";
import { setIsLogin, setUser } from "../../redux/modules/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [isJoin, setIsJoin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //input ref 모음
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const nicknameRef = useRef(null);

  //error 메시지 보여줄 ref 모음
  // const idErrorRef = useRef(null);
  // const passwordErrorRef = useRef(null);
  // const passwordConfirmErrorRef = useRef(null);
  // const nicknameErrorRef = useRef(null);

  //회원가입 여부 state 토글 기능
  const toggleState = () => {
    setIsJoin((state) => !state);
  };

  //쿠키 설정
  const setCookie = (token, minutes) => {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();

    document.cookie = "accessToken=" + (token || "") + expires + "; path=/";
  };

  //회원가입
  const handleRegister = async (newObj) => {
    try {
      await api.post("/register", newObj);
      // alert("회원가입이 완료되었습니다!");
      setIsJoin(false);
      toast.success("회원가입이 완료되었습니다!");
    } catch (error) {
      // alert("에러가 발생했습니다.");
      console.error(error);
    }
  };

  //로그인
  const handleLogin = async (memberObj) => {
    try {
      const response = await api.post("/login", memberObj, { widthCredentials: true });
      const accessToken = response.data.accessToken;
      setCookie(accessToken, 60);
      dispatch(setUser(response.data));
      dispatch(setIsLogin());
      toast.success("로그인 성공");
      navigate("/"); //TODO 여기서 하는거 맞는지 확인 필요
    } catch (error) {
      // alert("에러가 발생했습니다.");
      console.error(error);
    }
  };

  //로그인 및 회원가입
  const submitHandler = (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const password = e.target.password.value;
    const passwordConfirm = isJoin ? e.target.passwordConfirm.value : "";
    const nickname = isJoin ? e.target.nickname.value : "";

    //유효성 검사
    // if (!id) return (idErrorRef.current.innerText = "아이디를 입력해주세요");
    // if (!password) return (idErrorRef.current.innerText = "아이디를 입력해주세요");
    // if (isJoin && !passwordConfirm) return (idErrorRef.current.innerText = "아이디를 입력해주세요");
    // if (isJoin && !nickname) return (idErrorRef.current.innerText = "아이디를 입력해주세요");
    if (!id) {
      alert("아이디를 입력해주세요.");
      return idRef.current.focus();
    }
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return passwordRef.current.focus();
    }
    if (isJoin && !passwordConfirm) {
      alert("비밀번호 확인을 입력해주세요.");
      return passwordConfirmRef.current.focus();
    }
    if (isJoin && passwordConfirm !== password) {
      alert("비밀번호가 다릅니다.");
      return passwordConfirmRef.current.focus();
    }
    if (isJoin && !nickname) {
      alert("닉네임을 입력해주세요.");
      return nicknameRef.current.focus();
    }

    //isJoin state 에 따른 회원가입/로그인 로직 분기
    if (isJoin) {
      const newObj = {
        id,
        password,
        nickname
      };

      handleRegister(newObj);
    } else {
      const memberObj = {
        id,
        password
      };

      handleLogin(memberObj);
    }
  };

  return (
    <LoginWrap>
      <PageTitle>{isJoin ? "회원가입" : "로그인"}</PageTitle>
      <form onSubmit={submitHandler}>
        <InputName htmlFor="id">아이디</InputName>
        <InputStyle type="text" id="id" name="id" ref={idRef} minLength="4" maxLength="10" placeholder="아이디 (4~10글자)" />
        {/* <ColorError ref={idErrorRef}></ColorError> */}
        <InputName htmlFor="password">비밀번호</InputName>
        <InputStyle type="password" id="password" name="password" ref={passwordRef} minLength="4" maxLength="15" autoComplete="off" placeholder="비밀번호 (4~15글자)" />
        {/* <ColorError ref={passwordErrorRef}></ColorError> */}
        {isJoin ? (
          <>
            <InputName htmlFor="passwordConfirm">비밀번호 확인</InputName>
            <InputStyle type="password" id="passwordConfirm" name="passwordConfirm" ref={passwordConfirmRef} minLength="4" maxLength="15" autoComplete="off" placeholder="비밀번호 (4~15글자)" />
            {/* <ColorError ref={passwordConfirmErrorRef}></ColorError> */}
            <InputName htmlFor="nickname">닉네임</InputName>
            <InputStyle type="text" id="nickname" name="nickname" ref={nicknameRef} minLength="1" maxLength="10" placeholder="닉네임 (1~10글자)" />
            {/* <ColorError ref={nicknameErrorRef}></ColorError> */}
          </>
        ) : (
          <></>
        )}

        <BtnArea>
          <BtnBlackBg>{isJoin ? "회원가입" : "로그인"}</BtnBlackBg>
        </BtnArea>
      </form>
      <BtnBlackText onClick={toggleState}>{isJoin ? "로그인" : "회원가입"}</BtnBlackText>
    </LoginWrap>
  );
}
