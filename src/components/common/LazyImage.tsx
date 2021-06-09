import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Props {
  src: string;
  alt?: string;
  width?: string | number;
  hegith?: string | number;
  objectFit?: "contain" | "fill" | "cover" | any;
}

const LazyImage: React.FC<Props> = ({
  src,
  alt = "image",
  width = "100%",
  hegith = "100%",
  objectFit = "contain",
}) => {
  return src ? (
    <LazyLoadImage
      src={src}
      alt={alt}
      width={width}
      height={hegith}
      effect={"blur"}
      style={{ objectFit: objectFit }}
    />
  ) : (
    <EmptyLayout />
  );
};

const EmptyLayout = styled.p`
  display: flex;
  flex: 1;
  height: 100%;
  background: rgba(0, 0, 0, 0.05);
`;

export default LazyImage;
