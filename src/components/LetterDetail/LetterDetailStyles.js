import styled from "styled-components";

export const LetterContentItem = styled.div`
  margin: 1rem auto 3rem;
  padding: 1rem;
  max-width: 600px;
  box-shadow: 1px 1px 8px 1px #f1f1f1;
  border-radius: 5px;

  & textarea {
    min-height: 300px;
    border: none;
  }
  & textarea:read-only {
    outline: none;
  }
`;
export const LetterTopArea = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;
export const UserThumb = styled.div`
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
`;
export const ButtonBox = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 10px;
`;
export const ArtistInfo = styled.div`
  padding: 10px;
`;
