import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styled from "styled-components";
import { theme, mixin, breakpoint } from "../style/styles";
import Button from "../Button";
import { heroLinks } from "../../Assets/data/heroLinks";

const Hero__container = styled.div`
  position: relative;
  ${mixin.maxWidth};
  height: 70vh;
  min-height: 400px;
  max-height: 1000px;
`;

const Hero__img = styled.div`
  display: flex;
  align-items: flex-end;
  ${mixin.maxWidth};
  height: 70vh;
  min-height: 400px;
  max-height: 1000px;
  background: url(${({ url }) => url});
  background: linear-gradient(to right, rgba(24, 23, 23, 0.3), rgba(0, 0, 0, 0)),
    url(${({ url }) => url});
  background-size: cover;
  background-position: center;
`;

const Hero__textContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 55%;
  padding-left: 8rem;
  padding-bottom: 8rem;
  @media ${breakpoint.tabletL} {
    width: 70%;
  }
  @media ${breakpoint.tabletS} {
    width: 90%;
    padding-left: 5rem;
  }
  @media ${breakpoint.mobileL} {
    padding-left: 3rem;
  }
  h1 {
    font-size: 6rem;
    line-height: 6.5rem;
    letter-spacing: 0.1rem;
    margin-bottom: 3rem;
    color: ${theme.color.lightpink};
    @media ${breakpoint.tabletS} {
      font-size: 4rem;
      line-height: 4.5rem;
    }
    @media ${breakpoint.mobileL} {
      font-size: 2.8rem;
      line-height: 3.2rem;
    }
  }
`;

const properties = {
  duration: 2800,
  transitionDuration: 700,
  infinite: true,
  indicators: false,
  arrows: false,
  autoplay: true,
  pauseOnHover: true,
};

function Hero() {
  return (
    <Hero__container>
      <Fade {...properties}>
        {heroLinks.map((link) => {
          const { id, url, text, button, linkTo } = link;

          return (
            <Hero__img key={id} url={url}>
              <Hero__textContent>
                <h1>{text}</h1>
                <Button linkTo={linkTo} content={button} />
              </Hero__textContent>
            </Hero__img>
          );
        })}
      </Fade>
    </Hero__container>
  );
}

export default Hero;
