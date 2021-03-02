import React from "react";
import styled from "styled-components";
import { theme, mixin, breakpoint } from "../style/styles";
import { useProductsContext } from "../context";
import CurrencyFormat from "react-currency-format";

const CheckoutSummary__box = styled.div`
  background-color: ${theme.color.white};
  width: 100%;
  border: 0.1rem solid ${theme.color.grey};
  padding: 8%;
  h1 {
    font-family: ${theme.font.ubuntu};
    font-weight: 400;
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
  }
  div {
    width: 100%;
    ${mixin.flexBetween};
    margin: 1rem 0;
    h4 {
      font-size: 1.4rem;
      font-weight: 500;
    }
    p {
      font-family: ${theme.font.ubuntu};
      font-size: 1.3rem;
    }
    h2 {
      font-size: 2rem;
      font-weight: 800;
    }
    h6 {
      font-size: 1.7rem;
      font-weight: 500;
      font-family: ${theme.font.ubuntu};
    }
  }
  hr {
    background-color: ${theme.color.darkgrey};
    height: 0.1rem;
    width: 100%;
    margin: 2rem 0;
  }
`;
const CheckoutSummary__btn = styled.button`
  width: 100%;
  height: 4.5rem;
  background-color: ${theme.color.darkpink};
  font-weight: 400;
  font-size: 1.6rem;
  font-family: ${theme.font.ubuntu};
  ${mixin.transition};
  cursor: pointer;
  letter-spacing: 0.1rem;
  @media ${breakpoint.desktop} {
    &:hover {
      background-color: ${theme.color.pink};
    }
  }
`;

function CheckoutSummary() {
  const [{ basket }, dispatch] = useProductsContext();
  const subtotal = basket.reduce((total, item) => total + item.subtotal, 0);
  const delivery = 1.99;
  return (
    <CheckoutSummary__box>
      <h1>Order Summary</h1>
      <div>
        <h4>Subtotal</h4>
        <CurrencyFormat
          renderText={(value) => <p>{value}</p>}
          decimalScale={2}
          value={subtotal}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </div>
      <div>
        <h4>Delivery</h4>
        <p>${delivery}</p>
      </div>
      <div>
        <h2>Total</h2>
        <CurrencyFormat
          renderText={(value) => <h6>{value}</h6>}
          decimalScale={2}
          value={delivery + subtotal}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </div>
      <hr />
      <CheckoutSummary__btn>CHECKOUT</CheckoutSummary__btn>
    </CheckoutSummary__box>
  );
}

export default CheckoutSummary;
