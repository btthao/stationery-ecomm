import React from "react";
import styled from "styled-components";
import { theme, breakpoint, mixin } from "./style/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import PinterestIcon from "@material-ui/icons/Pinterest";
import TwitterIcon from "@material-ui/icons/Twitter";

const Footer__container = styled.div`
  ${mixin.flexCenter};
  ${mixin.maxWidth};
  ${mixin.padding};
  padding-top: 3rem;
  padding-bottom: 3rem;
  border-top: 0.1rem solid ${theme.color.grey};
  font-family: ${theme.font.ubuntu};
  @media ${breakpoint.tabletS} {
    flex-direction: column;
    align-items: flex-start;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`;

const Footer__socialmedia = styled.div`
  .MuiSvgIcon-root {
    font-size: 1.8rem;
    margin-right: 1rem;
    color: ${theme.color.lightblack};
    cursor: pointer;
  }
`;

const Footer__info = styled.div`
  display: flex;
  flex: 1;
  padding-left: 3rem;
  p {
    margin-right: 1.8rem;
    font-size: 1.6rem;
    cursor: pointer;
  }
  @media ${breakpoint.tabletS} {
    padding-left: 0;
    margin: 0.7rem 0;
  }
`;

const Footer__address = styled.div`
  font-size: 1.6rem;
`;

function Footer() {
  return (
    <Footer__container>
      <Footer__socialmedia>
        <FacebookIcon />
        <InstagramIcon />
        <PinterestIcon />
        <TwitterIcon />
      </Footer__socialmedia>
      <Footer__info>
        <p>Statine {new Date().getFullYear()}</p>
        <p>Privacy</p>
        <p>T&C</p>
      </Footer__info>
      <Footer__address>123 Happy Avenue</Footer__address>
    </Footer__container>
  );
}

export default Footer;
