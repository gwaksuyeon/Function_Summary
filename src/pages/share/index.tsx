import React, { useEffect } from "react";
import styled from "styled-components";

import {
  SvgShareFacebook,
  SvgShareKakao,
  SvgShareKakaostory,
  SvgShareNaver,
  SvgShareTwitter,
} from "assets/svgs";

declare global {
  interface Window {
    Kakao: any;
  }
}

const Share: React.FC = () => {
  const onClickShareKakao = (
    title: string,
    description: string,
    imageUrl: string,
    link: string
  ) => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title,
        description,
        imageUrl,
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
      },
      buttons: [
        {
          title: "자세히 보기",
          link: {
            mobileWebUrl: link,
            webUrl: link,
          },
        },
      ],
    });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";

    document.head.appendChild(script);

    if (window.Kakao) {
      const isInitialized = window.Kakao.isInitialized();

      if (!isInitialized) {
        window.Kakao.init(`${process.env.REACT_APP_KAKAO_KEY}`);
      }
    }
  }, []);

  return (
    <Container>
      <Contents>
        <Title>공유하기</Title>

        <SnsLayout>
          <Circle bgColor={"#fef01b"}>
            <SvgShareKakao />
          </Circle>
          <Circle bgColor={"#1877f2"}>
            <SvgShareFacebook />
          </Circle>
          <Circle bgColor={"#1ea1f1"}>
            <SvgShareTwitter />
          </Circle>
          <Circle bgColor={"#F9E301"}>
            <SvgShareKakaostory />
          </Circle>
          <Circle bgColor={"#2DB400"} width={"18px"} height={"18px"}>
            <SvgShareNaver />
          </Circle>
          <Circle borderColor={"#e5e5e5"}>URL</Circle>
        </SnsLayout>
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  min-width: 300px;
  max-width: 800px;
  border: 1px solid #e9edf1;
  border-radius: 4px;
  overflow: hidden;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 36px;
  background: #e9edf1;
  font-size: 16px;
  font-weight: bold;
`;

const SnsLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 8px;
`;

const Circle = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  background: ${(props: any) => props.bgColor};
  border: ${(props: any) => `1px solid ${props.borderColor}`};
  border-radius: 100%;
  font-weight: bold;
  cursor: pointer;

  svg {
    width: ${(props: any) => (props.width ? props.width : "32px")};
    height: ${(props: any) => (props.height ? props.height : "32px")};
  }

  & ~ & {
    margin-left: 8px;
  }
`;

export default Share;
