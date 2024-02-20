import styled from "styled-components";

export const HeaderContainer = styled.header`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;

  & h1 {
    font-weight: bold;
    font-size: 30px;
  }
`;
export const BtnLogout = styled.button`
  margin-left: 10px;
  border: none;
  background: none;
  color: #000000;
  font-size: inherit;
  font-family: inherit;
`;
