import LetterContent from "components/LetterDetail/LetterContent";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getLetter } from "../redux/modules/letterSlice";

export default function Detail() {
  const { data, isLoading, error } = useSelector((state) => state.letter);
  const params = useParams();
  const dispatch = useDispatch();
  let findData = {};

  //id랑 일치하는 데이터 찾기
  findData = data.find((item) => {
    return item.id === params.id;
  });

  useEffect(() => {
    dispatch(__getLetter());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return <LetterContent data={findData} />;
}
