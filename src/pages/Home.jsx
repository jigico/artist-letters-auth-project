import LetterList from "components/Letter/LetterList";
import LetterForm from "components/LetterForm/LetterForm";
import MemberList from "components/Members/MemberList";
import React from "react";

export default function Home() {
  return (
    <>
      <LetterForm />
      <MemberList />
      <LetterList />
    </>
  );
}
