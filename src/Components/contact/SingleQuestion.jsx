import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import { theme, mixin, breakpoint } from "../style/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const SingleQuestion__container = styled.div`
  width: 100%;
  background: ${theme.color.lightgrey};
  margin-bottom: 1.5rem;
`;
const SingleQuestion__header = styled.div`
  ${mixin.flexBetween};
  padding: 1rem 2rem;
  cursor: pointer;
  h1 {
    font-weight: 500;
    font-size: 1.8rem;
  }
  .MuiSvgIcon-root {
    font-size: 3rem;
    ${mixin.transition};
    ${({ show }) =>
      show
        ? css`
            transform: rotateX(180deg);
          `
        : css`
            transform: rotateX(0deg);
          `}
  }
`;
const SingleQuestion__body = styled.div`
  display: block;
  font-size: 1.4rem;
  font-family: ${theme.font.ubuntu};
  height: 0;
  transition: height ease 0.5s;
  overflow: hidden;
  div {
    padding: 3.5rem 2rem 2rem;
  }
`;

function SingleQuestion({ question, answer }) {
  const [show, setShow] = useState(false);
  const contentRef = useRef(null);
  const containerRef = useRef(null);

  const handleShow = () => {
    setShow(!show);
    const contentHeight = contentRef.current.getBoundingClientRect().height;
    const containerHeight = containerRef.current.getBoundingClientRect().height;

    if (containerHeight === 0) {
      containerRef.current.style.height = `${contentHeight}px`;
    } else {
      containerRef.current.style.height = "0";
    }
  };

  return (
    <SingleQuestion__container>
      <SingleQuestion__header show={show} onClick={() => handleShow()}>
        <h1>{question}</h1>
        <ExpandMoreIcon />
      </SingleQuestion__header>
      <SingleQuestion__body ref={containerRef}>
        <div ref={contentRef}>{answer}</div>
      </SingleQuestion__body>
    </SingleQuestion__container>
  );
}

export default SingleQuestion;
