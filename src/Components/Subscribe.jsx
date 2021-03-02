import React, { useState, useRef } from "react";
import styled from "styled-components";
import { theme, breakpoint, mixin } from "./style/styles";

const Subscribe__container = styled.div`
  ${mixin.maxWidth};
  div {
    width: 40%;
    min-width: 24rem;
    max-width: 60rem;
    padding: 4rem 1.5rem;
    margin: 8rem auto;
    background-color: ${theme.color.pink};
    display: grid;
    place-items: center;
    text-align: center;
    font-family: ${theme.font.ubuntu};
    h1 {
      font-size: 2.6rem;
      margin-bottom: 3rem;
      font-weight: 400;
    }
    p {
      margin-top: 2rem;
      font-size: 1.1rem;
    }
    @media ${breakpoint.tabletL} {
      width: 70%;
    }
    @media ${breakpoint.tabletS} {
      width: 90%;
      margin: 4rem auto;
      h1 {
        font-size: 2.1rem;
      }
    }
  }
`;

const Subscribe__form = styled.form`
  display: grid;
  grid-gap: 2rem;
  width: 100%;
  place-items: center;
  input {
    width: 70%;
    height: 3rem;
    text-align: center;
    font-size: 1.4rem;
    border: 0.1rem solid ${theme.color.black};
    outline: none;
  }
  button {
    padding: 1rem 2.2rem;
    font-size: 1.6rem;
    font-family: ${theme.font.ubuntu};
    color: ${theme.color.white};
    background: ${theme.color.black};
    cursor: pointer;
  }
`;
function Subscribe() {
  const inputRef = useRef(null);
  const [message, setMessage] = useState("Subscribe to our newsletter");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.value) {
      inputRef.current.value = "";
      setMessage("Subscribed!");
      let changeMessage = setTimeout(() => {
        setMessage("Subscribe to our newsletter");
      }, 3000);
    }
  };
  return (
    <Subscribe__container>
      <div>
        <h1>{message}</h1>
        <Subscribe__form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="email"
            placeholder="Enter your email"
            maxLength="70"
            ref={inputRef}
          />
          <button type="submit">SUBSCRIBE</button>
        </Subscribe__form>
        <p>By signing up you agree with our Terms & Conditions.</p>
      </div>
    </Subscribe__container>
  );
}

export default Subscribe;
