import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { ROUTE_ROOT } from "common/variables";

const Main: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <Title>룰렛</Title>
      <ButtonLayout>
        <Button onClick={() => history.push(ROUTE_ROOT.ROULETTE_LIBRARY)}>
          라이브러리
        </Button>
        <Button onClick={() => history.push(ROUTE_ROOT.ROULETTE_CANVAS)}>
          Canvas
        </Button>
      </ButtonLayout>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  padding: 2px 4px;
  border: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background: #ccc;
  }

  & ~ & {
    margin-left: 8px;
  }
`;

export default Main;
