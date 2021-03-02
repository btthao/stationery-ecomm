import React from "react";
import Hero from "./Hero";
import Carousel from "../Carousel";
import Reviews from "./Reviews";
import Slogan from "./Slogan";
import { allProductsList } from "../../Assets/data/allProductsList";

function Homepage() {
  const newProductsList = allProductsList.slice(0, 10);
  return (
    <>
      <Hero />
      <Slogan />
      <Carousel
        slides={newProductsList.length}
        list={newProductsList}
        title="Latest Products"
      />
      <Reviews />
    </>
  );
}

export default Homepage;
