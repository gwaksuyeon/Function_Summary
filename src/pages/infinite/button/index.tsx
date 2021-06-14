import React, { useState, useEffect } from "react";
import styled from "styled-components";
import loadable from "@loadable/component";

import { Ellipsis } from "style/mixin";
import DATA_JSON from "pages/infinite/data.json";

const LazyImage = loadable(() => import("components/common/LazyImage"));

const InfiniteButton: React.FC = () => {
  const LIMIT_COUNT = 8;
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(0);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const onRead = () => {
    const res = data.concat(
      DATA_JSON.slice(page * LIMIT_COUNT, page * LIMIT_COUNT + LIMIT_COUNT)
    );
    setData(res);
    setPage(page + 1);

    if (res.length >= DATA_JSON.length) {
      setIsEnd(true);
    }
  };

  const onClickMoreButton = () => {
    onRead();
  };

  useEffect(() => {
    onRead();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Main>
        {data.map((obj: any, inx: number) => (
          <ContentsLayout key={`contents-${inx}`}>
            <ImageLayout>
              <LazyImage src={obj.imageUrl} alt={"img"} />
            </ImageLayout>
            <Title>{obj.title}</Title>
            <Contents>{obj.contents}</Contents>
          </ContentsLayout>
        ))}
      </Main>

      {!isEnd && (
        <ButtonLayout>
          <Button onClick={onClickMoreButton}>더보기</Button>
        </ButtonLayout>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 60px;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px 32px;
  width: 100%;
  min-height: 100%;
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

const ButtonLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 32px;
`;

const Button = styled.div`
  width: 180px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e9edf1;
  cursor: pointer;
`;

export default InfiniteButton;
