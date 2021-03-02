import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useProductsContext } from "../context";
import styled, { css } from "styled-components";
import { theme, breakpoint, mixin } from "../style/styles";
import { auth } from "../../firebase";

const User__container = styled.div`
  ${mixin.maxWidth};
  ${mixin.padding};
  margin: 5rem auto;
  display: grid;
  place-items: center;
  grid-gap: 2rem;

  h1 {
    font-size: 3rem;
    font-family: ${theme.font.ubuntu};
    font-weight: 400;
    text-align: center;
    overflow-wrap: break-word;
    word-break: break-all;
  }
`;

const User__signout = styled.button`
  height: 3rem;
  width: 18rem;
  color: ${theme.color.black};
  background-color: ${theme.color.white};
  border: 0.2rem solid ${theme.color.pink};
  font-family: ${theme.font.ubuntu};
  font-size: 1.5rem;
  cursor: pointer;
`;
const User__viewBasket = styled(Link)`
  ${mixin.links};
  height: 3rem;
  width: 18rem;
  color: ${theme.color.black};
  background-color: ${theme.color.white};
  border: 0.2rem solid ${theme.color.pink};
  font-family: ${theme.font.ubuntu};
  font-size: 1.5rem;
  ${mixin.flexCenter};
`;

function User() {
  const [{ user }, dispatch] = useProductsContext();
  const history = useHistory();

  const logout = () => {
    if (user) {
      auth.signOut();
      history.push("/");
    }
  };

  return (
    user && (
      <User__container>
        <h1>Hello {user.email}</h1>
        <User__viewBasket to="/checkout">View Basket</User__viewBasket>
        <User__signout onClick={() => logout()}>Sign out</User__signout>
      </User__container>
    )
  );
}

export default User;
