import Header from "components/Header/Header";
import React, { useEffect, useState } from "react";
import { Layout1280 } from "./LayoutStyles";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "components/Footer/Footer";

const AuthLayout = () => {
  const [isRendered, setIsRendered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login");
    }

    setIsRendered(true);
  }, []);

  if (!isRendered) {
    return;
  }

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

export default AuthLayout;
