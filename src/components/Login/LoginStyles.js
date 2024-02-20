import styled from "styled-components";

export const ColorError = styled.span`
  color: red;
  font-size: 0.8rem;
`;
export const LoginWrap = styled.div`
  margin: 5rem auto;
  padding: 2rem;
  max-width: 350px;
  box-shadow: 0px 0 4px 2px #eee;
  border-radius: 5px;

  & ${ColorError} {
    display: inline-block;
    padding-top: 5px;
  }
`;
export const PageTitle = styled.h1`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  text-align: center;
`;
export const InputName = styled.label`
  margin-top: 0.5rem;
  padding: 0.3rem 0;
  display: block;
`;
export const InputStyle = styled.input`
  padding: 0 0.5rem;
  display: block;
  width: 100%;
  height: 28px;
  border-radius: 5px;
  border: 1px solid #ddd;

  &:focus {
    outline: none;
    border-color: #0063f8;
  }
`;
export const BtnArea = styled.div`
  margin-top: 1rem;
`;
export const BtnBlackBg = styled.button`
  width: 100%;
  height: 40px;
  border: 1px solid #000000;
  background: #000000;
  color: #ffffff;
  border-radius: 5px;
`;
export const BtnBlackText = styled.button`
  width: 100%;
  height: 40px;
  border: 1px solid #ffffff;
  background: #ffffff;
  color: #000000;
  border-radius: 5px;
`;
