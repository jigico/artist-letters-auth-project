import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BtnLogout, HeaderContainer } from "./HeaderStyles";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "../../redux/modules/authSlice";
import { getCookie } from "util/cookie";

export default function Header() {
  const COOKIE_KEY = "accessToken";
  const ACCESS_TOKEN = getCookie(COOKIE_KEY);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const { isLogin } = useSelector((state) => state.auth);

  //로그아웃
  const handleLogout = () => {
    document.cookie = COOKIE_KEY + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(setIsLogin());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("avatar");
    localStorage.removeItem("nickname");
  };

  useEffect(() => {
    if (!ACCESS_TOKEN) {
      if (isLogin) {
        dispatch(setIsLogin());
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("avatar");
      localStorage.removeItem("nickname");
    }
  }, [ACCESS_TOKEN]);

  return (
    <HeaderContainer>
      <h1>
        <Link to="./">ARTIST</Link>
      </h1>
      <div>
        {!userId && !ACCESS_TOKEN ? (
          <Link to="/login">로그인</Link>
        ) : (
          <>
            <Link to="/mypage">마이페이지</Link>
            <BtnLogout onClick={handleLogout}>로그아웃</BtnLogout>
          </>
        )}
      </div>
    </HeaderContainer>
  );
}
