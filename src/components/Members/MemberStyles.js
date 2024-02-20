import styled from "styled-components";

export const MemberListContainer = styled.ul`
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;
export const MemberThumbnail = styled.div`
  margin: 10px 0;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
`;
export const MemberThumbButton = styled.button`
  padding: 0;
  background: transparent;
  color: transparent;
  border: none;
  transition: all 0.3s;
  filter: ${(props) => (props.$isActive === "true" ? "unset" : "grayscale(1)")};

  > img {
    display: block;
    width: 100%;
  }
  &:hover,
  &:focus {
    filter: unset;
  }
`;
export const MemberItem = styled.li`
  text-align: center;
`;
export const CountStyle = styled.span`
  margin-left: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 14px;
  background-color: #ff0055;
  color: #ffffff;
`;
