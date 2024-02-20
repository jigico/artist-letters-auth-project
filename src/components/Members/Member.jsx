import React from "react";
import { CountStyle, MemberItem, MemberThumbButton, MemberThumbnail } from "./MemberStyles";
import { useSelector } from "react-redux";

export default function Member({ data, onClickHandler, isActive }) {
  const letterData = useSelector((state) => state.letter.data);
  let dataLength = 0;
  if (letterData && letterData[data.id]) {
    dataLength = letterData[data.id].length;
  }

  return (
    <MemberItem onClick={onClickHandler}>
      <MemberThumbnail>
        <MemberThumbButton type="button" $isActive={isActive}>
          <img src={data.thumbnail} alt={`${data.artist} 썸네일`} />
        </MemberThumbButton>
      </MemberThumbnail>
      <strong>{data.artist}</strong>
      <CountStyle>{dataLength}</CountStyle>
    </MemberItem>
  );
}
