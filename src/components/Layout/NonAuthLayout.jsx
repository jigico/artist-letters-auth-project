import Header from "components/Header/Header";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout1280 } from "./LayoutStyles";
import Footer from "components/Footer/Footer";

export const NonAuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header />
      <Layout1280>
        <Outlet />
      </Layout1280>
      <Footer />
    </>
  );
};
