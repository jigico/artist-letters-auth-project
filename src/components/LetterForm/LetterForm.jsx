import React, { useRef, useState } from "react";
import { FormContainer, LetterLabel, LetterTextarea } from "./LetterFormStyles";
import LetterSelect from "./LetterSelect";
import { ButtonBox } from "components/Button/ButtonStyles";
import Button from "components/Button/Button";
import userThumb from "../../assets/img/user.png";
import { useDispatch, useSelector } from "react-redux";
import { __addLetter } from "../../redux/modules/letterSlice";
import { useNavigate } from "react-router-dom";

export default function LetterForm() {
  const memberData = useSelector((state) => state.member.memberData);
  const { isLogin, userId, nickname, avatar } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selected, setSelected] = useState("");
  const contentsRef = useRef(null);
  const selectRef = useRef(null);

  //폼 이벤트
  const formHandler = (e) => {
    e.preventDefault();
    const contents = e.target.contents.value;

    //유효성 검사
    if (!isLogin) {
      alert("로그인 후 팬레터 등록이 가능합니다. 로그인 화면으로 이동합니다.");
      navigate("/login");
      return;
    }
    if (!selected.trim()) {
      alert("아티스트를 선택해주세요");
      selectRef.current.focus();
      return;
    }
    if (!contents.trim()) {
      alert("컨텐츠를 입력해주세요");
      contentsRef.current.focus();
      return;
    }

    //등록 기능
    saveLetter(contents);

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
  const saveLetter = (contents) => {
    const date = new Date();
    const artist = findMember();

    const newDataObj = {
      createdAt: date,
      nickname,
      avatar,
      content: contents,
      writedTo: artist,
      artistId: selected,
      // id,
      userId
    };

    // dispatch(addLetter({ newDataObj, selected }));
    dispatch(__addLetter(newDataObj));
  };

  return (
    <FormContainer onSubmit={formHandler}>
      닉네임 : {isLogin && nickname ? nickname : "로그인 후 이용 가능합니다."}
      <LetterSelect id="artistSelect" onChangeHandler={(e) => onChangeHandler(e)} memberData={memberData} selectRef={selectRef}></LetterSelect>
      <LetterLabel htmlFor="contents">내용</LetterLabel>
      <LetterTextarea name="contents" id="contents" cols="30" rows="10" maxLength="80" ref={contentsRef} placeholder="최대 80자까지 입력할 수 있습니다."></LetterTextarea>
      <ButtonBox>
        <Button variant="success">등록</Button>
      </ButtonBox>
    </FormContainer>
  );
}
