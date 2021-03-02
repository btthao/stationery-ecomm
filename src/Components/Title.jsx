import React from "react";
import styled, { css } from "styled-components";
import { theme, breakpoint, mixin } from "./style/styles";

const SectionTitle = styled.div`
  ${mixin.flexCenter};
  ${({ align }) =>
    align === "left"
      ? css`
          justify-content: flex-start;
        `
      : css`
          justify-content: center;
        `}
  width: 100%;
  margin-bottom: 3rem;
`;

const SectionTitle__textBorder = styled.div`
  position: absolute;
  top: 0;
  background: transparent;
  height: 100%;
  width: 25%;
  border-bottom: 0.2rem solid ${theme.color.pink};
  ${({ position }) =>
    position === "right"
      ? css`
          right: 50%;
        `
      : css`
          left: 50%;
        `}
  ${mixin.transition};
`;

const SectionTitle__text = styled.div`
  position: relative;
  color: ${theme.color.black};
  font-size: 3rem;
  font-weight: 400;
  letter-spacing: 0.1rem;
  padding-bottom: 0.5rem;
  &:hover ${SectionTitle__textBorder} {
    width: 50%;
  }
  @media ${breakpoint.mobileL} {
    font-size: 2.5rem;
  }
`;

function Title({ text, align }) {
  return (
    <SectionTitle align={align}>
      <SectionTitle__text>
        {text}
        <SectionTitle__textBorder position="left" />
        <SectionTitle__textBorder position="right" />
      </SectionTitle__text>
    </SectionTitle>
  );
}

export default Title;
