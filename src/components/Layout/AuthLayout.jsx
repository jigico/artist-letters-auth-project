import Header from "components/Header/Header";
import React from "react";
import { Layout1280 } from "./LayoutStyles";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer/Footer";

const AuthLayout = () => {
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
