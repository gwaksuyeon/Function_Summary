import React from "react";
import styled from "styled-components";
import loadable from "@loadable/component";

import { ROUTE_ROOT } from "common/variables";

const Menu = loadable(() => import("components/main/Menu"));

const Main: React.FC = () => {
  return (
    <Container>
      <Contents>
        <Menu title={"룰렛"} link={ROUTE_ROOT.ROULETTE} />
        <Menu title={"공유하기"} link={ROUTE_ROOT.SHARE} />
      </Contents>
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

const Contents = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
`;

export default Main;
