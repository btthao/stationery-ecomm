import React from "react";
import styled, { keyframes } from "styled-components";
import { theme, breakpoint, mixin } from "../style/styles";
import FlareIcon from "@material-ui/icons/Flare";
import StarIcon from "@material-ui/icons/Star";

const Slogan__container = styled.div`
  ${mixin.maxWidth};
  margin: 8.5rem auto;
  @media ${breakpoint.tabletS} {
    margin: 6rem auto;
  }
`;

const Slogan__text = styled.h1`
  margin: auto;
  text-align: center;
  width: 40%;
  font-size: 2.4rem;
  font-weight: 400;
  color: ${theme.color.lightblack};
  @media ${breakpoint.tabletL} {
    width: 70%;
  }
  @media ${breakpoint.mobileL} {
    width: 80%;
    font-size: 1.7rem;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Slogan__iconArea = styled.div`
  margin-top: 3rem;
  width: 100%;
  ${mixin.flexCenter};
  .MuiSvgIcon-root {
    width: 2.2rem;
    height: 2.2rem;
    color: ${theme.color.pinkish};
    margin: 0 2rem;
    animation: ${rotate} 5s linear infinite;
    &:nth-child(2) {
      width: 4.5rem;
      height: 4.5rem;
      animation: none;
    }
    @media ${breakpoint.mobileL} {
      margin: 0 1rem;
    }
  }
`;

function Slogan() {
  return (
    <Slogan__container>
      <Slogan__text>
        Tohi Curabitur tortor. Pellentesque nibh. Aenean quam. In sem at dolor.
        Maecenas mattis. Sed convallis tristique sem. Proin ut ligula egestas
        porttitor. Morbi lectus risus, iaculis vel.
      </Slogan__text>
      <Slogan__iconArea>
        <FlareIcon />
        <StarIcon />
        <FlareIcon />
      </Slogan__iconArea>
    </Slogan__container>
  );
}

export default Slogan;
