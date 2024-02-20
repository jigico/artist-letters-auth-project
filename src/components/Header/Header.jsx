import React from "react";
import { Link } from "react-router-dom";
import { HeaderContainer } from "./HeaderStyles";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "../../redux/modules/authSlice";

export default function Header() {
  const COOKIE = "accessToken";
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);

  //로그아웃
  const handleLogout = () => {
    document.cookie = COOKIE + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(setIsLogin());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("avatar");
    localStorage.removeItem("nickname");
  };

  return (
    <HeaderContainer>
      <h1>
        <Link to="./">ARTIST</Link>
      </h1>
      <div>
        {!isLogin ? (
          <Link to="/login">로그인</Link>
        ) : (
          <>
            <Link to="/mypage">마이페이지</Link>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        )}
      </div>
    </HeaderContainer>
  );
}
