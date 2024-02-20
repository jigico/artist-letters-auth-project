import React, { useRef, useState } from "react";
import { FormContainer, LetterInput, LetterLabel, LetterTextarea } from "./LetterFormStyles";
import LetterSelect from "./LetterSelect";
import { v4 as uuidv4 } from "uuid";
import { ButtonBox } from "components/Button/ButtonStyles";
import Button from "components/Button/Button";
import userThumb from "../../assets/img/user.png";
import { useDispatch, useSelector } from "react-redux";
import { AddLetter } from "../../redux/modules/letter";

export default function LetterForm() {
  const memberData = useSelector((state) => state.member.memberData);
  const dispatch = useDispatch();

  const [selected, setSelected] = useState("");
  const nameRef = useRef(null);
  const contentsRef = useRef(null);
  const selectRef = useRef(null);

  //폼 이벤트
  const formHandler = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const contents = e.target.contents.value;

    //유효성 검사
    if (!selected.trim()) {
      alert("아티스트를 선택해주세요");
      selectRef.current.focus();
      return;
    }
    if (!name.trim()) {
      alert("닉네임을 입력해주세요");
      nameRef.current.focus();
      return;
    }
    if (!contents.trim()) {
      alert("컨텐츠를 입력해주세요");
      contentsRef.current.focus();
      return;
    }

    //등록 기능
    saveLetter(name, contents);

    alert("등록이 완료되었습니다.");
    e.target.reset();
    setSelected("");
  };

  /**
   * 중앙에서 관리 할 필요가 없을 것 같아서 useState 사용
   * 선택한 아티스트의 option value 에 들어있는 값으로 useState 값 업데이트
   * 레터 등록 시 사용
   */
  //아티스트 셀렉트박스 이벤트
  const onChangeHandler = (e) => {
    setSelected(e.target.value);
  };

  /**
   * 선택한 아티스트의 이름 구하기
   * 레터 등록 시 사용
   */
  const findMember = () => {
    const findData = memberData.find((item) => {
      return item.id === Number(selected);
    });
    return findData.artist;
  };

  //등록 기능
  const saveLetter = (name, contents) => {
    const id = uuidv4();
    const date = new Date();
    const artist = findMember();

    const newDataObj = {
      createdAt: date,
      nickname: name,
      avatar: userThumb,
      content: contents,
      writedTo: artist,
      id
    };

    dispatch(AddLetter({ newDataObj, selected }));
  };

  return (
    <FormContainer onSubmit={formHandler}>
      <LetterSelect id="artistSelect" onChangeHandler={(e) => onChangeHandler(e)} memberData={memberData} selectRef={selectRef}></LetterSelect>
      <LetterLabel htmlFor="name">닉네임</LetterLabel>
      <LetterInput type="text" id="name" name="name" ref={nameRef} maxLength="10" placeholder="최대 10자까지 입력할 수 있습니다." />
      <LetterLabel htmlFor="contents">내용</LetterLabel>
      <LetterTextarea name="contents" id="contents" cols="30" rows="10" maxLength="80" ref={contentsRef} placeholder="최대 80자까지 입력할 수 있습니다."></LetterTextarea>
      <ButtonBox>
        <Button variant="success">등록</Button>
      </ButtonBox>
    </FormContainer>
  );
}
