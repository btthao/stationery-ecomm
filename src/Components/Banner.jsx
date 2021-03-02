import React from "react";
import styled from "styled-components";
import { theme, breakpoint, mixin } from "./style/styles";
import banner from "../Assets/images/banner.jpg";

const Banner__container = styled.div`
  width: 100%;
  height: 50rem;
  background: url(${banner});
  background-size: cover;
  background-position: center;
  ${mixin.flexCenter};
  ${mixin.maxWidth};
  font-size: 12rem;
  color: ${theme.color.white};
  font-weight: 600;
  text-shadow: 2px 0px 14px rgba(230, 230, 230, 0.78);
  @media ${breakpoint.tabletS} {
    font-size: 8rem;
  }
  @media ${breakpoint.mobileL} {
    height: 20rem;
    font-size: 4rem;
  }
`;

function Banner({ text }) {
  return <Banner__container>{text}</Banner__container>;
}

export default Banner;
