import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { theme, breakpoint, mixin } from "../style/styles";
import { auth } from "../../firebase";

const Login__container = styled.div`
  width: 35rem;
  padding: 3rem;
  background-color: ${theme.color.lightgrey};
  font-family: ${theme.font.ubuntu};
  margin: 5rem auto 0;
  display: grid;
  place-items: center;
  grid-gap: 2rem;
  h1 {
    justify-self: flex-start;
    font-weight: 400;
    font-size: 2rem;
    color: ${theme.color.darkpink};
  }
  @media ${breakpoint.mobileL} {
    width: 90%;
    min-width: 25rem;
  }
`;

const Login__form = styled.form`
  display: grid;
  place-items: center;
  width: 100%;
  h4 {
    font-size: 1.4rem;
    justify-self: flex-start;
    font-weight: 400;
  }
  input {
    width: 100%;
    height: 3rem;
    margin-bottom: 1.2rem;
    border: 0.1rem solid ${theme.color.darkgrey};
    padding: 0 0.7rem;
  }
`;

const Login__button = styled.button`
  margin-top: 1rem;
  width: 100%;
  cursor: pointer;
  ${({ color }) =>
    color === "pink"
      ? css`
          background-color: ${theme.color.darkpink};
          color: ${theme.color.black};
        `
      : css`
          background-color: ${theme.color.lightblack};
          color: ${theme.color.white};
        `}
  height: 3rem;
  font-size: 1.5rem;
  font-family: ${theme.font.ubuntu};
`;

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((e) => alert(e.message));
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((e) => alert(e.message));
  };
  return (
    <Login__container>
      <h1>Login</h1>
      <Login__form>
        <h4>Email</h4>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <h4>Password</h4>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Login__button color="pink" type="submit" onClick={login}>
          Login
        </Login__button>
      </Login__form>
      <Login__button onClick={register}>Create account</Login__button>
    </Login__container>
  );
}

export default Login;
