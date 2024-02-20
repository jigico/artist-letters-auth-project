import React from "react";
import Member from "./Member";
import { MemberListContainer } from "./MemberStyles";
import { useDispatch, useSelector } from "react-redux";
import { setMemberId } from "../../redux/modules/member";

export default function MemberList() {
  const { memberData, memberId } = useSelector((state) => state.member);
  const dispatch = useDispatch();

  const viewList = (id) => {
    dispatch(setMemberId(id));
  };

  return (
    <MemberListContainer>
      {memberData.map((item) => {
        const id = item.id;
        return <Member key={item.id} data={item} onClickHandler={() => viewList(id)} isActive={memberId === id ? "true" : "false"} />;
      })}
    </MemberListContainer>
  );
}
