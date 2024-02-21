import React, { useEffect } from "react";
import LetterItem from "./LetterItem";
import { LetterContainer } from "./LetterStyles";
import EmptyItem from "./EmptyItem";
import { useDispatch, useSelector } from "react-redux";
import { __getLetter } from "../../redux/modules/letterSlice";

export default function LetterList() {
  const data = useSelector((state) => state.letter.data);
  const memberId = useSelector((state) => state.member.memberId);
  const dispatch = useDispatch();
  const letterData = data.filter((item) => {
    return item.artistId == memberId;
  });

  useEffect(() => {
    dispatch(__getLetter());
  }, []);

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
