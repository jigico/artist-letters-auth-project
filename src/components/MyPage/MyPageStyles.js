import styled from "styled-components";

export const MyPageWrap = styled.div`
  margin: 10rem auto;
  padding: 2rem;
  text-align: center;
`;
export const ThumbnailBox = styled.figure`
  width: 100%;

  & img {
    width: 100%;
  }
`;
export const FileLabelStyle = styled.label`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 210px;
  height: 210px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #f1f1f1;
  cursor: pointer;

  & input {
    display: none;
  }
`;
export const InputStyle = styled.input`
  margin-top: 10px;
  padding: 0.4rem;
  border: none;
  font: inherit;
  font-size: 1.5rem;
  text-align: center;

  &:read-only {
    outline: none;
  }
`;
export const UserIdText = styled.p`
  margin-top: 5px;
  color: #999;
`;
export const BtnBox = styled.div`
  margin: 1rem 0;
`;
export const BtnBlackBg = styled.button`
  height: 30px;
  border: 1px solid #000000;
  background: #000000;
  color: #ffffff;
  border-radius: 5px;
`;
export const BtnBlackText = styled.button`
  height: 30px;
  border: 1px solid #ffffff;
  background: #ffffff;
  color: #000000;
  border-radius: 5px;
`;
