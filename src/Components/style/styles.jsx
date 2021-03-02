import { css } from "styled-components";

export const theme = {
  color: {
    darkpink: "#F1A1B2",
    pink: "#fcbdc9",
    pinkish: "#ebb8c2",
    lightpink: "#ffe2e7",
    black: "#302d2d",
    lightblack: "#5e5d5d",
    brown: "#746a6b",
    grey: "#e3e3e3",
    lightgrey: "#f5f5f5",
    darkgrey: "#dfdede",
    white: "#ffffff",
  },
  font: {
    ubuntu: "'Ubuntu', sans-serif",
  },
};

export const breakpoint = {
  mobileS: `(max-width: 320px)`,
  mobileL: `(max-width: 425px)`,
  tabletS: `(max-width: 768px)`,
  tabletL: `(max-width: 1024px)`,
  desktop: `(min-width: 500px)`,
};

export const mixin = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  flexEven: css`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  `,
  links: css`
    text-decoration: none;
    color: ${theme.color.black};
  `,
  maxWidth: css`
    width: 100%;
    max-width: 1600px;
    min-width: 280px;
    margin: auto;
  `,
  transition: css`
    transition: all 0.4s ease-in-out;
  `,
  padding: css`
    padding-left: 4rem;
    padding-right: 4rem;
    @media ${breakpoint.mobileL} {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  `,
};
