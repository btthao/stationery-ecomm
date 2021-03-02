import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { theme, mixin, breakpoint } from "../style/styles";
import { useProductsContext } from "../context";
import Title from "../Title";
import Button from "../Button";
import CheckoutProduct from "./CheckoutProduct";
import CheckoutSummary from "./CheckoutSummary";

const Checkout__container = styled.div`
  ${mixin.maxWidth};
  background: ${theme.color.lightgrey};
  padding-top: 5rem;
  padding-bottom: 5rem;
  min-height: 100vh;
`;

const Checkout__main = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: 55rem 27rem;
  grid-gap: 4rem;
  align-items: flex-start;
  justify-content: center;
  @media ${breakpoint.tabletL} {
    grid-template-columns: 1fr;
    width: 80%;
    max-width: 50rem;
    grid-gap: 1rem;
  }
`;

const Checkout__empty = styled.div`
  margin: auto;
  text-align: center;
  h1 {
    font-size: 3rem;
    margin: 5rem auto 8rem;
    color: ${theme.color.lightblack};
  }
`;

function Checkout() {
  const [{ user, basket }, dispatch] = useProductsContext();
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setUpdated(true);

    return () => {
      setUpdated(false);
    };
  }, [basket]);

  return (
    <Checkout__container>
      <Title text="Your Basket" />
      {basket.length === 0 ? (
        <Checkout__empty>
          <h1>Your basket is empty.</h1>
          <Button linkTo="/products" content="Continue Shopping" />
        </Checkout__empty>
      ) : (
        <Checkout__main>
          <div>
            {updated &&
              basket.map((product, index) => {
                return (
                  <CheckoutProduct key={index} info={product}></CheckoutProduct>
                );
              })}
          </div>
          <div>
            <CheckoutSummary></CheckoutSummary>
          </div>
        </Checkout__main>
      )}
    </Checkout__container>
  );
}

export default Checkout;
