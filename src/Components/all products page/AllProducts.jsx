import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Banner from "../Banner";
import { theme, mixin, breakpoint } from "../style/styles";
import { useProductsContext } from "../context";
import ProductCard from "../ProductCard";
import Filters from "./Filters";

const AllProducts__container = styled.div`
  ${mixin.maxWidth};
`;

const AllProducts__grid = styled.div`
  ${mixin.padding};
  width: 100%;
  margin: 4rem auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  grid-gap: 1.5rem;
  @media ${breakpoint.tabletL} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
  }
  @media ${breakpoint.mobileL} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const AllProducts__noMatch = styled.h4`
  font-size: 4rem;
  width: fit-content;
  margin: 10rem auto 15rem;
  color: ${theme.color.pink};
`;

function AllProducts() {
  const [{ products, filtered }] = useProductsContext();
  const [data, setData] = useState(products);
  const [didMount, setDidMount] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      setData(filtered);
      setNoMatch(false);
      if (filtered.length === 0) {
        setNoMatch(true);
      }
    }
  }, [filtered]);

  return (
    <AllProducts__container>
      <Banner text="Products"></Banner>
      <Filters />
      {noMatch && <AllProducts__noMatch>No matches 🥲</AllProducts__noMatch>}
      <AllProducts__grid>
        {data.map((item, index) => {
          const { id, productName, price, imgUrl } = item;
          return (
            <ProductCard
              key={index}
              id={id}
              productName={productName}
              price={price}
              url={imgUrl}
            ></ProductCard>
          );
        })}
      </AllProducts__grid>
    </AllProducts__container>
  );
}

export default AllProducts;
