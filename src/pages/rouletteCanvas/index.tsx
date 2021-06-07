import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { SvgPin } from "assets/svgs";

const RouletteCanvas: React.FC = () => {
  const data = ["1000", "2000", "3000", "4000", "5000", "10", "10000", "꽝"];
  const [rotate, setRotate] = useState<number>(0);
  const [easeOut, setEaseOut] = useState<number>(0);
  const [top, setTop] = useState<any>(null);
  const [offset, setOffset] = useState<any>(null);
  const [radians, setRadians] = useState<number>(0);
  const [result, setResult] = useState<any>(null);
  const [spinning, setSpinning] = useState<boolean>(false);

  const renderWheel = () => {
    const numOptions = data.length;
    const arcSize = (Math.PI * 2) / numOptions;

    setRadians(arcSize);

    topPosition(numOptions, arcSize);

    let angle: number = 0;
    for (let i = 0; i < numOptions; i++) {
      let text = data[i];
      renderSector(
        i + 1,
        text,
        angle,
        arcSize,
        `${text === "10000" ? "#29a2b0" : i % 2 === 0 ? "#fac242" : "#fff"}`
      );
      angle += arcSize;
    }
  };

  const topPosition = (num: number, angle: number) => {
    let topSpot = null;
    let degreesOff = null;

    if (num === 9) {
      topSpot = 7;
      degreesOff = Math.PI / 2 - angle * 2;
    } else if (num === 8) {
      topSpot = 6;
      degreesOff = 0;
    } else if (num <= 7 && num > 4) {
      topSpot = num - 1;
      degreesOff = Math.PI / 2 - angle;
    } else if (num === 4) {
      topSpot = num - 1;
      degreesOff = 0;
    } else if (num <= 3) {
      topSpot = num;
      degreesOff = Math.PI / 2;
    }

    setTop(topSpot);
    setOffset(degreesOff);
  };

  const renderSector = (
    index: number,
    text: string,
    start: number,
    arc: number,
    color: string
  ) => {
    let canvas = document.getElementById("wheel") as HTMLCanvasElement;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let radius = 100;
    let startAngle = start;
    let endAngle = start + arc;
    let angle = index * arc;
    let baseSize = radius * 2.5;
    let textRadius = baseSize - 120;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.lineWidth = radius * 2;
    ctx.strokeStyle = color;

    ctx.font = "bold 32px Arial ";
    ctx.fillStyle = "black";
    ctx.stroke();

    ctx.save();
    ctx.translate(
      baseSize + Math.cos(angle - arc / 2) * textRadius,
      baseSize + Math.sin(angle - arc / 2) * textRadius
    );
    ctx.rotate(angle - arc / 2 + Math.PI / 2);
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.restore();
  };

  const onClickspin = () => {
    let randomSpin = Math.floor(Math.random() * data.length) + 500;
    setRotate(randomSpin);
    setEaseOut(2);
    setSpinning(true);

    setTimeout(() => {
      getResult(randomSpin);
    }, 2000);
  };

  const getResult = (spin: number) => {
    const netRotation = ((spin % 360) * Math.PI) / 180;
    let travel = netRotation + offset;
    let count = top + 1;

    while (travel > 0) {
      travel -= radians;
      count--;
    }

    let res;
    if (count >= 0) {
      res = count;
    } else {
      res = data.length + count;
    }

    setResult(res);
  };

  const reset = () => {
    setRotate(0);
    setEaseOut(0);
    setResult(null);
    setSpinning(false);
  };

  useEffect(() => {
    renderWheel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Title>캔버스 룰렛</Title>

      <RouletteLayout>
        <PinLayout>
          <SvgPin />
        </PinLayout>
        <canvas
          id="wheel"
          width={500}
          height={500}
          style={{
            WebkitTransform: `rotate(${rotate}deg)`,
            WebkitTransition: `-webkit-transform ${easeOut}s ease-out`,
          }}
        />
        <Button onClick={spinning ? reset : onClickspin}>CLICK</Button>
      </RouletteLayout>

      <p>{data[result]}</p>
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
export default RouletteCanvas;
