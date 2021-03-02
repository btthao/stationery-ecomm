import React from "react";
import styled from "styled-components";
import { theme, breakpoint, mixin } from "./style/styles";
import Title from "./Title";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import ProductCard from "./ProductCard";
import { useMediaQuery } from "react-responsive";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const Carousel__section = styled.div`
  ${mixin.maxWidth};
  ${mixin.padding};
  margin: 6rem auto;
`;

const Carousel__container = styled(CarouselProvider)`
  position: relative;
  width: 100%;
  min-width: 95rem;
  margin: auto;
  @media ${breakpoint.tabletL} {
    min-width: 73rem;
  }
  @media ${breakpoint.tabletS} {
    min-width: 38rem;
  }
  @media ${breakpoint.mobileL} {
    min-width: 23rem;
  }
`;

const Carousel__slider = styled(Slider)`
  width: 100%;
  height: 100%;
`;

const Carousel__slide = styled(Slide)`
  .carousel__inner-slide {
    ${mixin.flexCenter};
    padding: 5%;
  }
`;

const PrevBtn = styled(ButtonBack)`
  position: absolute;
  top: 50%;
  left: -1rem;
  transform: translateY(-100%);
  background-color: transparent;
  &:disabled .MuiSvgIcon-root {
    color: ${theme.color.grey};
  }
  .MuiSvgIcon-root {
    width: 40px;
    height: 40px;
    color: ${theme.color.black};
    @media ${breakpoint.tabletS} {
      width: 30px;
      height: 30px;
    }
  }
`;
const NextBtn = styled(ButtonNext)`
  position: absolute;
  top: 50%;
  right: -1rem;
  transform: translateY(-100%);
  background-color: transparent;
  &:disabled .MuiSvgIcon-root {
    color: ${theme.color.grey};
  }
  .MuiSvgIcon-root {
    width: 40px;
    height: 40px;
    color: ${theme.color.black};
    @media ${breakpoint.tabletS} {
      width: 30px;
      height: 30px;
    }
  }
`;

function Carousel(props) {
  const { slides, list, title } = props;
  const isTablet = useMediaQuery({ query: `${breakpoint.tabletL}` });
  const isTabletS = useMediaQuery({ query: `${breakpoint.tabletS}` });
  const isMobile = useMediaQuery({ query: `${breakpoint.mobileL}` });
  return (
    <Carousel__section>
      <Title text={title} />
      <Carousel__container
        naturalSlideWidth={150}
        naturalSlideHeight={200}
        totalSlides={slides}
        visibleSlides={isMobile ? 2 : isTabletS ? 3 : isTablet ? 4 : 6}
      >
        <Carousel__slider>
          {list.map((item, index) => {
            const { id, productName, price, imgUrl } = item;
            return (
              <Carousel__slide key={id} index={index}>
                <ProductCard
                  id={id}
                  productName={productName}
                  price={price}
                  url={imgUrl}
                ></ProductCard>
              </Carousel__slide>
            );
          })}
        </Carousel__slider>
        <NextBtn>
          <NavigateNextIcon />
        </NextBtn>
        <PrevBtn>
          <NavigateBeforeIcon />
        </PrevBtn>
      </Carousel__container>
    </Carousel__section>
  );
}

export default Carousel;
