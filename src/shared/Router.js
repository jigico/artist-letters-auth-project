import Main from "components/Layout/Main";
import Detail from "pages/Detail";
import Home from "pages/Home";
import Login from "pages/Login";
import MyPage from "pages/MyPage";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export default function Router() {
  const isLogin = useSelector((state) => state.auth.isLogin);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {isLogin ? (
          <>
            <Route element={<Main />}>
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/mypage" element={<MyPage />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
