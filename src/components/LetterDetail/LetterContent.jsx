import React, { useRef, useState } from "react";
import { ArtistInfo, ButtonBox, LetterContentItem, LetterDate, LetterTopArea, UserName, UserThumb } from "./LetterDetailStyles";
import { LetterTextarea } from "components/LetterForm/LetterFormStyles";
import { useNavigate } from "react-router-dom";
import Button from "components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateLetter, deleteLetter } from "../../redux/modules/letter";
import { getFormattedDate } from "util/date";

export default function LetterContent({ data }) {
  const { data: LetterData } = useSelector((state) => state.letter);
  const memberData = useSelector((state) => state.member.memberData);
  const dispatch = useDispatch();

  //전역으로 관리하지 않아도 되는 데이터 모음
  const [content, setContent] = useState(data.content);
  const contentRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  //수정할 member id 찾기
  const findMember = () => {
    const findData = memberData.find((item) => item.artist === data.writedTo);
    return findData.id;
  };

  //수정 영역 활성화 기능
  const editTextarea = () => {
    contentRef.current.focus();
    contentRef.current.readOnly = false;
    setIsEditing(true);
  };

  //수정 취소 시 - 수정 영역 비활성화 기능
  const cancelEditTextarea = () => {
    contentRef.current.readOnly = true;
    setContent(data.content);
    setIsEditing(false);
  };

  //수정 기능
  const editLetter = () => {
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      contentRef.current.focus();
      return;
    }
    if (data.content === content) {
      alert("변경된 내용이 없습니다. 확인 후 다시 눌러주세요.");
      contentRef.current.focus();
      return;
    }

    //수정할 데이터 id 조회
    const memberId = findMember();
    let updateIdx = null;

    LetterData[memberId].forEach((el, idx) => {
      if (el["id"] === data.id) {
        updateIdx = idx;
      }
    });

    dispatch(updateLetter({ updateMemberId: memberId, updateIdx, content }));
    setContent(content);
    alert("수정이 완료되었습니다.");

    //textarea 비활성화
    contentRef.current.readOnly = true;
    setIsEditing(false);
  };

  //삭제 기능
  const deleteLetterHandler = () => {
    const answer = window.confirm("정말 삭제하겠습니까?");
    if (!answer) return alert("삭제를 취소하였습니다.");

    // 삭제할 데이터 id 조회
    const memberId = findMember();
    let deleteIdx = null;
    //삭제할 데이터의 index 구하기
    LetterData[memberId].forEach((el, idx) => {
      if (el["id"] === data.id) {
        deleteIdx = idx;
      }
    });

    dispatch(deleteLetter({ memberId, deleteIdx }));

    alert("삭제가 완료되었습니다. 메인 화면으로 이동합니다.");
    navigate("/");
  };

  //textarea 에 입력한 값 useState로 관리
  const changeHandler = (e) => {
    setContent(e.target.value);
  };

  return (
    <LetterContentItem>
      <LetterTopArea>
        <UserThumb>
          <img src={data.avatar} alt={`${data.nickname} 썸네일`} />
        </UserThumb>
        <div>
          <UserName>{data.nickname}</UserName>
          <LetterDate>{getFormattedDate(data.createdAt)}</LetterDate>
        </div>
      </LetterTopArea>
      <ArtistInfo>To {data.writedTo}</ArtistInfo>
      <LetterTextarea cols="30" rows="5" value={content} onChange={changeHandler} maxLength="80" ref={contentRef} readOnly placeholder="최대 80자까지 입력할 수 있습니다."></LetterTextarea>
      <ButtonBox>
        {isEditing === true ? (
          <>
            <Button clickHandler={editLetter} variant="success">
              완료
            </Button>
            <Button clickHandler={cancelEditTextarea} variant="normal">
              취소
            </Button>
          </>
        ) : (
          <>
            <Button clickHandler={editTextarea} variant="success">
              수정
            </Button>
            <Button clickHandler={deleteLetterHandler} variant="danger">
              삭제
            </Button>
          </>
        )}
      </ButtonBox>
    </LetterContentItem>
  );
}
