import React from "react";
import { Letter, LetterContents, LetterDate, LetterTopArea, UserName, UserThumbBox } from "./LetterStyles";
import { Link } from "react-router-dom";
import { getFormattedDate } from "util/date";

export default function LetterItem({ data }) {
  return (
    <Letter>
      <Link to={`/detail/${data.id}`}>
        <LetterTopArea>
          <UserThumbBox>
            <img src={data.avatar} alt={`${data.nickname} 썸네일`} />
          </UserThumbBox>
          <div>
            <UserName>{data.nickname}</UserName>
            <LetterDate>{getFormattedDate(data.createdAt)}</LetterDate>
          </div>
        </LetterTopArea>
        <LetterContents>{data.content}</LetterContents>
      </Link>
    </Letter>
  );
}
