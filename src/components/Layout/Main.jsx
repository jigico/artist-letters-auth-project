import Header from "components/Header/Header";
import React from "react";
import { Outlet } from "react-router-dom";
import { Layout1280 } from "./LayoutStyles";
import Footer from "components/Footer/Footer";

export default function Main() {
  return (
    <>
      <Header />
      <Layout1280>
        <Outlet />
      </Layout1280>
      <Footer />
    </>
  );
}
