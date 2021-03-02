import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { theme, mixin, breakpoint } from "../style/styles";
import { useProductsContext } from "../context";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CurrencyFormat from "react-currency-format";

const CheckoutProduct__item = styled.div`
  ${mixin.flexCenter};
  background-color: ${theme.color.white};
  width: 100%;
  height: 20rem;
  border: 0.1rem solid ${theme.color.lightpink};
  margin-bottom: 3rem;
  @media ${breakpoint.mobileL} {
    height: 17rem;
  }
`;

const CheckoutProduct__left = styled(Link)`
  ${mixin.flexCenter};
  ${mixin.links};
  width: 22rem;
  height: 100%;
  img {
    object-fit: contain;
    width: 75%;
    height: 75%;
  }
  @media ${breakpoint.tabletS} {
    width: 13rem;
  }
  @media ${breakpoint.mobileL} {
    width: 10rem;
  }
`;
const CheckoutProduct__right = styled.div`
  flex: 1;
  align-self: flex-start;
  padding-top: 6%;
  padding-left: 2%;
  h5 {
    font-size: 1.6rem;
    font-family: ${theme.font.ubuntu};
    font-weight: 400;
    margin-bottom: 0.7rem;
  }

  hr {
    background-color: ${theme.color.grey};
    height: 0.1rem;
    width: 90%;
  }
  @media ${breakpoint.mobileL} {
    h5,
    p {
      font-size: 1.4rem;
    }
  }
`;

const CheckoutProduct__link = styled(Link)`
  ${mixin.links};
  font-size: 2rem;
  font-weight: 500;
  color: ${theme.color.darkpink};
  transition: ${mixin.transition};
  display: block;
  margin-bottom: 0.5rem;
  width: fit-content;
  border-bottom: 0.1rem solid transparent;
  &:hover {
    border-bottom: 0.1rem solid ${theme.color.pink};
  }
`;

const CheckoutProduct__quantityBox = styled.div`
  ${mixin.flexCenter};
  width: 7.5rem;
  margin: 1.2rem 0 2.2rem;
  height: 2rem;
`;
const CheckoutProduct__count = styled.div`
  width: 2rem;
  height: 100%;
  ${mixin.flexCenter};
  cursor: pointer;
  background-color: ${theme.color.lightgrey};
  .MuiSvgIcon-root {
    font-size: 1.5rem;
    color: ${theme.color.darkpink};
  }
`;
const CheckoutProduct__quantity = styled.div`
  ${mixin.flexCenter};
  flex: 1;
  height: 100%;
  font-size: 1.8rem;
  font-family: ${theme.font.ubuntu};
  font-weight: 400;
`;

const CheckoutProduct__remove = styled.button`
  background-color: transparent;
  margin-top: 0.8rem;
  font-size: 1.5rem;
  font-family: ${theme.font.ubuntu};
  font-weight: 400;
  color: ${theme.color.lightblack};
  cursor: pointer;
`;

function CheckoutProduct(props) {
  const [state, dispatch] = useProductsContext();
  const { id, productName, imgUrl, quantity, subtotal } = props.info;
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      payload: id,
    });
  };

  const increaseQuantity = () => {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: id,
    });
  };
  const decreaseQuantity = () => {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: id,
    });
  };

  return (
    <CheckoutProduct__item>
      <CheckoutProduct__left to={`/products/${id}`}>
        <img src={require(`../../Assets/images/${imgUrl}`).default} alt="" />
      </CheckoutProduct__left>
      <CheckoutProduct__right>
        <CheckoutProduct__link to={`/products/${id}`}>
          {productName}
        </CheckoutProduct__link>
        <CurrencyFormat
          renderText={(value) => <h5>{value}</h5>}
          decimalScale={2}
          value={subtotal}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
        <CheckoutProduct__quantityBox>
          <CheckoutProduct__count onClick={() => decreaseQuantity()}>
            <RemoveIcon />
          </CheckoutProduct__count>
          <CheckoutProduct__quantity>{quantity}</CheckoutProduct__quantity>
          <CheckoutProduct__count onClick={() => increaseQuantity()}>
            <AddIcon />
          </CheckoutProduct__count>
        </CheckoutProduct__quantityBox>
        <hr />

        <CheckoutProduct__remove
          type="button"
          onClick={() => removeFromBasket()}
        >
          Remove
        </CheckoutProduct__remove>
      </CheckoutProduct__right>
    </CheckoutProduct__item>
  );
}

export default CheckoutProduct;
