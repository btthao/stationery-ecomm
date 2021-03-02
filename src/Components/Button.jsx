import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme, breakpoint, mixin } from "./style/styles";

const Button__container = styled(Link)`
  ${mixin.links};
  ${mixin.transition};
  font-family: ${theme.font.ubuntu};
  font-size: 1.6rem;
  padding: 0.9rem 2rem;
  background-color: ${theme.color.white};
  color: ${theme.color.black};
  border: 0.2rem solid ${theme.color.pink};
  @media ${breakpoint.desktop} {
    &:hover {
      background-color: ${theme.color.pinkish};
    }
  }
  @media ${breakpoint.mobileL} {
    font-size: 1.3rem;
    padding: 0.6rem 1.7rem;
  }
`;

function Button({ linkTo, content }) {
  return <Button__container to={linkTo}>{content}</Button__container>;
}

export default Button;
