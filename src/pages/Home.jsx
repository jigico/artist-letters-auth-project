import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { Layout1280 } from "components/Layout/LayoutStyles";
import LetterList from "components/Letter/LetterList";
import LetterForm from "components/LetterForm/LetterForm";
import MemberList from "components/Members/MemberList";
import TopBanner from "components/TopBanner/TopBanner";
import React from "react";

export default function Home() {
  return (
    <>
      <Header />
      <TopBanner />
      <Layout1280>
        <LetterForm />
        <MemberList />
        <LetterList />
      </Layout1280>
      <Footer />
    </>
  );
}
