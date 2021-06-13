import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import loadable from "@loadable/component";

import {useIntersectionObserver} from './hooks';
import { Ellipsis } from "style/mixin";
import DATA_JSON from "./data.json";

const LazyImage = loadable(() => import("components/common/LazyImage"));

const InfiniteScroll: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(0);
  const ref = useRef<any>(null);
  const LIMIT_COUNT = 8;

  const isBottomVisible =  useIntersectionObserver(ref, {threshold: 1}, false);

  const onRead = () => {
      setData(data.concat(DATA_JSON.slice(page * LIMIT_COUNT, page*LIMIT_COUNT + LIMIT_COUNT)));
  };

  useEffect(() => {
    if(isBottomVisible) {
      setPage(page + 1);
      onRead();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBottomVisible])

  return (
    <Container>
      {data.map((obj: any, inx: number) => (
        <ContentsLayout key={`contents-${inx}`}>
          <ImageLayout>
            <LazyImage src={obj.imageUrl} alt={"img"} />
          </ImageLayout>
          <Title>{obj.title}</Title>
          <Contents>{obj.contents}</Contents>
        </ContentsLayout>
      ))}
      <div ref={ref} style={{width: '100%', height: '60px'}}></div>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px 32px;
  width: 100%;
  min-height: 100%;
  padding: 60px 60px 0 60px;
`;

const ContentsLayout = styled.div``;

const ImageLayout = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-bottom: 16px;

  &:after {
    display: block;
    padding-bottom: 100%;
    content: "";
  }

  > span {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
  ${Ellipsis(1)}
`;

const Contents = styled.p`
  ${Ellipsis(2)}
`;

export default InfiniteScroll;
