import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

interface Props {
  title: string;
  link: string;
}
const Menu: React.FC<Props> = ({ title, link }) => {
  const history = useHistory();

  return (
    <Container onClick={() => history.push(link)}>
      <Title>{title}</Title>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 125px;
  border: 1px solid #e9edf1;
  cursor: pointer;
  margin: 2px;
  &:hover {
    background: #e9edf1;
  }
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

export default Menu;
