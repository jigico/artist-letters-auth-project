import React from "react";
import { LetterLabel, SelectStyle } from "./LetterFormStyles";

export default function LetterSelect({ memberData, onChangeHandler, selectRef }) {
  return (
    <>
      <LetterLabel htmlFor="artistSelect">아티스트</LetterLabel>
      <SelectStyle id="artistSelect" onChange={onChangeHandler} ref={selectRef}>
        <option value="">아티스트를 선택해주세요.</option>
        {memberData.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.artist}
            </option>
          );
        })}
      </SelectStyle>
    </>
  );
}
