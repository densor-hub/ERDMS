import React, { CSSProperties } from "react";

interface imageProp {
  alt: any;
  src: any;
  style?: CSSProperties;
}

const Image = ({ alt, src }: imageProp) => {
  return <img src={src} alt={alt}></img>;
};

export default Image;
