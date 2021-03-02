import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { theme, breakpoint, mixin } from "../style/styles";
import Title from "../Title";
import { reviews } from "../../Assets/data/reviews";

const appear = keyframes`
  from{   
    opacity: 0
  }
  to{    
    opacity: 1
  }
`;

const Reviews__container = styled.div`
  ${mixin.maxWidth};
  ${mixin.padding};
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1.3fr;
  grid-gap: 4rem;
  background-color: ${theme.color.lightgrey};
  height: 45rem;
  padding-top: 4rem;
  padding-bottom: 4rem;
  margin: 7rem auto;
  @media ${breakpoint.tabletS} {
    height: 78rem;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2.5fr;
  }
`;

const Reviews__left = styled.div`
  width: 100%;
  height: 100%;
`;
const Reviews__right = styled.div`
  ${mixin.flexCenter};
  flex-direction: column;
  width: 100%;
  height: 100%;
  @media ${breakpoint.tabletS} {
    grid-row: 1;
  }
`;

const Reviews__img = styled.div`
  background: url(${({ url }) => url});
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  &.show {
    animation: ${appear} 0.7s 1;
  }
`;

const Reviews__content = styled.div`
  width: 100%;
  margin-bottom: 2.5rem;
  p {
    font-size: 1.6rem;
    font-family: ${theme.font.ubuntu};
    line-height: 2.3rem;
    min-height: 10rem;
    color: ${theme.color.lightblack};
    &.show {
      animation: ${appear} 0.7s 1;
    }
  }
`;

const Reviews__nav = styled.div`
  align-self: flex-start;
  position: relative;
  display: flex;
  height: 2rem;
  width: 35%;
  min-width: 35rem;
  background-color: ${theme.color.pinkish};
  border-radius: 0.7rem;
  border: 0.1rem solid ${theme.color.pinkish};
  @media ${breakpoint.tabletS} {
    width: 60%;
    min-width: 22rem;
  }
`;

const Reviews__clicked = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% / 3);
  height: 100%;
  z-index: 1;
  border-radius: 0.7rem;
  background-color: ${theme.color.black};
  ${({ position }) =>
    position == 0
      ? css`
          transform: translateX(0);
        `
      : position == 1
      ? css`
          transform: translateX(100%);
        `
      : css`
          transform: translateX(200%);
        `};
  transition: transform 0.4s ease-in-out;
`;

const Reviews__topic = styled.div`
  ${mixin.flexCenter};
  width: calc(100% / 3);
  height: 100%;
  border-radius: 0.7rem;
  font-size: 1.2rem;
  font-family: ${theme.font.ubuntu};
  color: ${theme.color.white};
  cursor: pointer;
  z-index: 2;
`;

function Reviews() {
  const [value, setValue] = useState(0);
  const [animate, setAnimate] = useState(false);

  const appearEffect = (index) => {
    setValue(index);
    setAnimate(true);
  };

  const { text, img } = reviews[value];
  return (
    <Reviews__container>
      <Reviews__left>
        <Reviews__img
          url={img}
          onAnimationEnd={() => setAnimate(false)}
          className={animate ? "show" : ""}
        />
      </Reviews__left>
      <Reviews__right>
        <Reviews__content>
          <Title text="Reviews" align="left" />
          <p className={animate ? "show" : ""}>{text}</p>
        </Reviews__content>
        <Reviews__nav>
          <Reviews__clicked position={value}></Reviews__clicked>
          {reviews.map((item, index) => {
            return (
              <Reviews__topic key={item.id} onClick={() => appearEffect(index)}>
                {item.label}
              </Reviews__topic>
            );
          })}
        </Reviews__nav>
      </Reviews__right>
    </Reviews__container>
  );
}

export default Reviews;
