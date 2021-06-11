import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import loadable from "@loadable/component";

import { Ellipsis } from "style/mixin";
import DATA_JSON from "./data.json";

const LazyImage = loadable(() => import("components/common/LazyImage"));

const InfiniteScroll: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const target = useRef<any>(null);

  const onRead = () => {
    setData(DATA_JSON);
  };

  const createObserver = () => {
    let options = {
      root: null,
      rootMargin: "0px 0px 20px 0px",
      threshold: 0,
    };

    let observer = new IntersectionObserver(onChceckIntersect, options);

    console.log(target.current);
    let targetRef: any = target.current;
    observer.observe(targetRef);
  };

  const onChceckIntersect = (entries: any, observer: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        onAddList();
      }
    });
  };

  const onAddList = () => {
    setData(
      data.concat([
        {
          no: 11,
          title: "제목11",
          contents:
            "내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
          imageUrl: "http://placehold.it/300x300/1877f2/aae&text=test",
        },
        {
          no: 12,
          title: "제목12",
          contents:
            "내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
          imageUrl: "http://placehold.it/300x300/fef01b/aae&text=test",
        },
        {
          no: 13,
          title: "제목13",
          contents:
            "내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
          imageUrl: "http://placehold.it/300x300/1ea1f1/aae&text=test",
        },
        {
          no: 14,
          title: "제목14",
          contents:
            "내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
          imageUrl: "http://placehold.it/300x300/fef01b/e5e5e5&text=test",
        },
        {
          no: 15,
          title: "제목15",
          contents:
            "내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
          imageUrl: "http://placehold.it/300x300/2DB400/aae&text=test",
        },
      ])
    );
  };

  useEffect(() => {
    onRead();
    createObserver();
  }, []);

  return (
    <Container>
      {data.map((obj: any, inx: number) => (
        <ContentsLayout key={`contents-${inx}`} ref={target}>
          <ImageLayout>
            <LazyImage src={obj.imageUrl} alt={"img"} />
          </ImageLayout>
          <Title>{obj.title}</Title>
          <Contents>{obj.contents}</Contents>
        </ContentsLayout>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  min-height: 100%;
  padding: 60px;
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
