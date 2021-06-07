import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Wheel } from "react-custom-roulette";

import { SvgPin } from "assets/svgs";

const RouletteLibrary: React.FC = () => {
  const [isProgress, setIsProgress] = useState<boolean>(false);
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);

  const data = [
    { option: "1000" },
    { option: "2000" },
    { option: "3000" },
    { option: "4000" },
    { option: "5000" },
    { option: "10" },
    {
      option: "10000",
      style: { backgroundColor: "#29a2b0", textColor: "#fff" },
    },
    { option: "꽝" },
  ];

  // 조명 원 그리기
  const writeLightCircle = (count: number, r: number, id: string) => {
    /**
     * @descript
     * count: 그릴 조명 원 개수
     * r: 원 반지름
     */

    const div = 360 / count;
    const radius = r;
    const parentDiv = document.getElementById(id) as any;
    const offsetToParentCenter = parentDiv.offsetWidth / 2;
    const offsetToChildCenter = 20;
    const totalOffset = offsetToParentCenter - offsetToChildCenter;

    for (let i = 0; i < count; i++) {
      const childDiv = document.createElement("div");
      childDiv.className = "circle";
      childDiv.style.position = "absolute";

      const y = Math.sin(div * i * (Math.PI / 180)) * radius;
      const x = Math.cos(div * i * (Math.PI / 180)) * radius;

      childDiv.style.top = `${y + totalOffset}px`;
      childDiv.style.left = `${x + totalOffset}px`;
      parentDiv.appendChild(childDiv);
    }
  };

  // 룰렛 클릭
  const onClickSpinButton = () => {
    // 룰렛 참여 조건

    setIsProgress(true);
  };

  // 룰렛 결과
  const onCheckResult = () => {
    // 당첨결과 정해둠
    setPrizeNumber(0);

    // 랜덤
    // setPrizeNumber(Math.floor(Math.random() * data.length))
    setMustSpin(true);
  };

  // 룰렛 끝난 후
  const onStopSpinning = () => {
    window.alert(data[prizeNumber].option);

    setTimeout(() => {
      setMustSpin(false);
      setIsProgress(false);
    }, 100);
  };

  useEffect(() => {
    writeLightCircle(32, 230, "parentDiv");
  }, []);

  useEffect(() => {
    if (isProgress) {
      onCheckResult();
    }
  }, [isProgress]);

  return (
    <Container>
      <Title>라이브러리 룰렛</Title>
      <RouletteLayout>
        <PinLayout>
          <SvgPin />
        </PinLayout>
        <OuterCircleLayout>
          <div id="parentDiv"></div>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            backgroundColors={["#fac242", "#fff"]}
            outerBorderColor={"#cf1f32"}
            outerBorderWidth={4}
            radiusLineWidth={0}
            perpendicularText={true}
            textDistance={68}
            fontSize={32}
            onStopSpinning={onStopSpinning}
          />
        </OuterCircleLayout>

        <Button onClick={onClickSpinButton}>CLICK</Button>
      </RouletteLayout>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #afdbd3;
  overflow: hidden;
`;

const Title = styled.p`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 60px;
`;

const RouletteLayout = styled.div`
  width: 500px;
  height: 500px;
  position: relative;
`;

const PinLayout = styled.div`
  width: 90px;
  height: 90px;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const OuterCircleLayout = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: #ed2324;
  border: 4px solid #cf1f32;
  border-radius: 100%;

  #parentDiv {
    width: 100%;
    position: absolute;
    top: 15px;
    left: 15px;

    .circle {
      width: 12px;
      height: 12px;
      background: #fff;
      border-radius: 100%;
      box-shadow: 0 0 7px 0 #ffed7c;
    }
  }

  > div:last-of-type {
    position: absolute;
    top: 23px;
    left: 24px;
    transform: rotate(-45deg);

    img {
      display: none;
    }
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: #ed2324;
  border: 4px solid #fff;
  border-radius: 100%;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  z-index: 10;
`;

export default RouletteLibrary;
