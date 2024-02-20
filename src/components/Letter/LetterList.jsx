import React from "react";
import LetterItem from "./LetterItem";
import { LetterContainer } from "./LetterStyles";
import EmptyItem from "./EmptyItem";
import { useSelector } from "react-redux";

export default function LetterList() {
  const data = useSelector((state) => state.letter.data);
  const memberId = useSelector((state) => state.member.memberId);
  const letterData = data[memberId];

  //데이터 여부에 따라서 분기
  //데이터 있을 경우 IetterItem, 없을 경우 빈 컴포넌트 EmptyItem
  if (letterData && letterData.length) {
    return (
      <LetterContainer>
        {letterData.map((item) => (
          <LetterItem key={item.id} data={item} />
        ))}
      </LetterContainer>
    );
  } else {
    return <EmptyItem />;
  }
}
