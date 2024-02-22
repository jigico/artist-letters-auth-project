import React, { useEffect } from "react";
import Member from "./Member";
import { MemberListContainer } from "./MemberStyles";
import { useDispatch, useSelector } from "react-redux";
import { setMemberId } from "../../redux/modules/memberSlice";
import { __getLetter } from "../../redux/modules/letterSlice";

export default function MemberList() {
  const { memberData, memberId } = useSelector((state) => state.member);
  const { data } = useSelector((state) => state.letter);
  const dispatch = useDispatch();

  const viewList = (id) => {
    dispatch(setMemberId(id));
  };

  useEffect(() => {
    dispatch(__getLetter());
  }, [dispatch]);

  return (
    <MemberListContainer>
      {memberData.map((item) => {
        const dataLength = data.filter((el) => el.artistId == item.id).length;
        const id = item.id;
        return <Member key={item.id} data={item} onClickHandler={() => viewList(id)} dataLength={dataLength} isActive={memberId === id ? "true" : "false"} />;
      })}
    </MemberListContainer>
  );
}
