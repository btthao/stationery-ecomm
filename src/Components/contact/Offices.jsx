import React from "react";
import styled from "styled-components";
import { theme, mixin, breakpoint } from "../style/styles";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

const Offices__container = styled.div`
  width: 100%;
  padding: 10rem 0;
  margin-top: 7rem;
  ${mixin.flexCenter}
  @media ${breakpoint.tabletS} {
    flex-direction: column;
    padding: 2rem 0;
  }
`;

const Offices__line = styled.div`
  height: 8rem;
  width: 0.1rem;
  background-color: ${theme.color.pink};
  @media ${breakpoint.tabletS} {
    height: 0.1rem;
    width: 13rem;
    margin: 4rem auto;
  }
`;

const Offices__section = styled.div`
  display: grid;
  place-items: center;
  margin: 0 4rem;
  width: 40%;
  text-align: center;
  color: ${theme.color.lightblack};
  .MuiSvgIcon-root {
    font-size: 5rem;
    color: ${theme.color.black};
  }
  h4 {
    font-size: 2rem;
  }
  p {
    font-size: 1.5rem;
    margin-top: 0.4rem;
  }
  @media ${breakpoint.tabletS} {
    width: 90%;
  }
`;

function Offices() {
  return (
    <Offices__container>
      <Offices__section>
        <ContactMailIcon />
        <h4>Customer Service</h4>
        <p>8392844</p>
        <p>abc@gmail.com</p>
      </Offices__section>
      <Offices__line></Offices__line>
      <Offices__section>
        <PeopleAltIcon />
        <h4>Marketing and Partnerships</h4>
        <p>8392844</p>
        <p>abc@gmail.com</p>
      </Offices__section>
    </Offices__container>
  );
}

export default Offices;
