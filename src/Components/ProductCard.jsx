import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme, breakpoint, mixin } from "./style/styles";

const ProductCard__container = styled(Link)`
  ${mixin.flexCenter};
  flex-direction: column;
  ${mixin.links};
  width: 100%;
  height: 100%;
  padding: 3%;
`;

const ProductCard__imgBox = styled.div`
  width: 100%;
  padding-bottom: 100%;
  background-color: ${theme.color.lightgrey};
  position: relative;
`;

const ProductCard__img = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: contain;
  width: 68%;
  height: 68%;
`;

const ProductCard__name = styled.h1`
  font-size: 1.7rem;
  font-weight: 500;
  margin: 1.2rem 0 0.2rem;
  color: ${theme.color.lightblack};
  font-style: italic;
  @media ${breakpoint.tabletS} {
    font-size: 1.5rem;
    margin: 1rem 0 0.1rem;
  }
`;

const ProductCard__price = styled.p`
  font-size: 1.4rem;
  color: ${theme.color.black};
  @media ${breakpoint.tabletS} {
    font-size: 1.2rem;
  }
`;

function ProductCard(props) {
  const { id, productName, price, url } = props;

  return (
    <ProductCard__container to={`/products/${id}`}>
      <ProductCard__imgBox>
        <ProductCard__img
          src={require(`../Assets/images/${url}`).default}
        ></ProductCard__img>
      </ProductCard__imgBox>
      <ProductCard__name>{productName}</ProductCard__name>
      <ProductCard__price>${price}</ProductCard__price>
    </ProductCard__container>
  );
}

export default ProductCard;
