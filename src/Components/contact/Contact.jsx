import React from "react";
import styled from "styled-components";
import Banner from "../Banner";
import { theme, mixin, breakpoint } from "../style/styles";
import Title from "../Title";
import Offices from "./Offices";
import SingleQuestion from "./SingleQuestion";
import { faq } from "../../Assets/data/faq";

const Contact__container = styled.div`
  ${mixin.maxWidth};
  margin-top: 4rem;
  display: grid;
  place-items: center;
`;

const Contact__questions = styled.div`
  display: grid;
  place-items: center;
  width: 65%;
  min-width: 23rem;
  @media ${breakpoint.tabletL} {
    width: 80%;
  }
  @media ${breakpoint.tabletS} {
    width: 92%;
  }
`;

function Contact() {
  return (
    <>
      <Banner text="Contact" />
      <Contact__container>
        <Contact__questions>
          <Title text="FAQ" />
          {faq.map((item) => {
            return (
              <SingleQuestion
                key={item.id}
                question={item.question}
                answer={item.answer}
              ></SingleQuestion>
            );
          })}
        </Contact__questions>
        <Offices />
      </Contact__container>
    </>
  );
}

export default Contact;
