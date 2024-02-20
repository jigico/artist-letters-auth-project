import styled from "styled-components";

export const LetterContainer = styled.ul`
  margin: 3rem auto;
  width: 500px;
  max-width: 85%;
  min-height: 500px;
`;
export const Letter = styled.li`
  margin: 1rem auto;
  padding: 1rem;
  box-shadow: 1px 1px 8px 1px #f1f1f1;
  border-radius: 5px;

  & a {
    display: block;
  }
`;
export const LetterTopArea = styled.div`
  display: flex;
  align-items: center;
`;
export const UserThumbBox = styled.div`
  margin-right: 1rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;

  & img {
    width: 100%;
  }
`;
export const UserName = styled.strong`
  margin-bottom: 5px;
  display: block;
  color: #000;
`;
export const LetterDate = styled.span`
  color: #999;
  font-size: 14px;
`;
export const LetterContents = styled.p`
  margin-top: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const EmptyStye = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  font-size: 20px;
`;
