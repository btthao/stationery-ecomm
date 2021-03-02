import React from "react";
import styled from "styled-components";
import { theme, mixin } from "../style/styles";

const AboutCard__container = styled.div`
  ${mixin.transition};
  width: 100%;
  &:hover {
    transform: translateY(-0.6rem);
  }
`;
const AboutCard__content = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 80%;
`;

const AboutCard__img = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ img }) => img});
  background-size: cover;
  background-position: center;
`;

const AboutCard__title = styled.h1`
  margin: 1rem 0 0.6rem;
  font-size: 2rem;
  font-weight: 600;
  color: ${theme.color.pink};
`;

const AboutCard__text = styled.p`
  font-size: 1.6rem;
  font-family: ${theme.font.ubuntu};
  color: ${theme.color.black};
`;

function AboutCard({ name, img, desc }) {
  return (
    <AboutCard__container>
      <AboutCard__content>
        <AboutCard__img img={img}></AboutCard__img>
      </AboutCard__content>
      <AboutCard__title>{name}</AboutCard__title>
      <AboutCard__text>{desc}</AboutCard__text>
    </AboutCard__container>
  );
}

export default AboutCard;
