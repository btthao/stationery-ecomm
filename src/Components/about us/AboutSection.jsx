import React from "react";
import styled from "styled-components";
import { breakpoint, mixin } from "../style/styles";
import AboutCard from "./AboutCard";
import { aboutList } from "../../Assets/data/aboutList";

const AboutSection__container = styled.div`
  ${mixin.maxWidth};
  ${mixin.padding};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  margin: 13rem auto;
  grid-gap: 4rem;
  @media ${breakpoint.tabletS} {
    grid-template-columns: 1fr;
    margin: 4rem auto;
    grid-gap: 6rem;
  }
`;

function AboutSection() {
  return (
    <AboutSection__container>
      {aboutList.map((item) => {
        const { id, name, desc, img } = item;
        return (
          <AboutCard
            key={id}
            name={name}
            desc={desc}
            img={require(`../../Assets/images/${img}.jpg`).default}
          />
        );
      })}
    </AboutSection__container>
  );
}

export default AboutSection;
