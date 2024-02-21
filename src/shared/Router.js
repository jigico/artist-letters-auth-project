import AuthLayout from "components/Layout/AuthLayout";
import Main from "components/Layout/Main";
import { NonAuthLayout } from "components/Layout/NonAuthLayout";
import Detail from "pages/Detail";
import Home from "pages/Home";
import Login from "pages/Login";
import MyPage from "pages/MyPage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Main />}>
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/mypage" element={<MyPage />} />
        </Route>
        <Route element={<NonAuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
