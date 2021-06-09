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
        <Menu title={"페이징"} link={ROUTE_ROOT.PAGINATION} />
        <Menu title={"무한스크롤"} link={ROUTE_ROOT.INFINITY_SCROLL_PAGING} />
        <Menu title={"무한페이징"} link={ROUTE_ROOT.INFINITY_PAGING} />
        <Menu title={"접속권한"} link={ROUTE_ROOT.ROLES} />
        <Menu title={"에디터"} link={ROUTE_ROOT.EDITOR} />
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
