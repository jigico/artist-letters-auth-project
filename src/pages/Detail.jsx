import LetterContent from "components/LetterDetail/LetterContent";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Detail() {
  const data = useSelector((state) => state.letter.data);
  const params = useParams();
  let findData = {};

  //id랑 일치하는 데이터 찾기
  for (const value of Object.values(data)) {
    for (let i = 0; i < value.length; i++) {
      if (value[i].id === params.id) {
        findData = value[i];
        break;
      }
    }
  }

  return <LetterContent data={findData} />;
}
