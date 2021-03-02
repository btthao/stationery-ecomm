import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme, mixin, breakpoint } from "../style/styles";
import { useParams } from "react-router-dom";
import { allProductsList } from "../../Assets/data/allProductsList";
import StarIcon from "@material-ui/icons/Star";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Carousel from "../Carousel";
import { useProductsContext } from "../context";
import { Link, useHistory } from "react-router-dom";

const Product__container = styled.div`
  ${mixin.maxWidth};
  ${mixin.padding};
  display: grid;
  place-items: center;
  grid-template-columns: 1.2fr 1fr;
  height: auto;
  padding: 10rem 0;
  background-color: ${theme.color.lightgrey};
  @media ${breakpoint.tabletL} {
    grid-template-columns: 1fr;
    grid-gap: 5rem;
  }
`;
const Product__imgContainer = styled.div`
  width: 70%;
  height: 100%;
  align-self: flex-start;
  padding: 2rem 4rem;
  @media ${breakpoint.tabletS} {
    width: 95%;
  }
`;
const Product__img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const Product__infoContainer = styled.div`
  width: 100%;
  display: grid;
  align-self: flex-start;
  text-align: center;
  h4 {
    font-size: 1.6rem;
    color: ${theme.color.darkpink};
    font-weight: 400;
    font-family: ${theme.font.ubuntu};
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
  h1 {
    font-size: 4.2rem;
    font-weight: 400;
    margin-bottom: 2rem;
    color: ${theme.color.lightblack};
  }
  h6 {
    font-weight: 400;
    font-size: 1.7rem;
    font-family: ${theme.font.ubuntu};
    margin-bottom: 1rem;
  }
  h5 {
    color: ${theme.color.lightblack};
    font-weight: 400;
    font-size: 1.6rem;
    font-family: ${theme.font.ubuntu};
    margin: 0.4rem auto;
    span {
      font-weight: 500;
    }
  }
`;

const Product__rating = styled.div`
  margin: 1rem 0;
  color: ${theme.color.darkpink};
  .MuiSvgIcon-root {
    font-size: 1.8rem;
  }
`;

const Product__addToBasket = styled.button`
  width: 50%;
  margin: 1rem auto;
  min-width: 23rem;
  height: 5rem;
  background-color: ${theme.color.pink};
  font-weight: 400;
  font-size: 1.5rem;
  font-family: ${theme.font.ubuntu};
  border: 0.1rem solid ${theme.color.pink};
  ${mixin.transition};

  ${mixin.flexCenter};
  cursor: pointer;
  &:hover {
    background-color: ${theme.color.white};
  }
`;
const Product__quantityBox = styled.div`
  ${mixin.flexCenter};
  width: 50%;
  margin: 1rem auto;
  min-width: 23rem;
  height: 5rem;
  border: 0.1rem solid ${theme.color.lightblack};
`;
const Product__count = styled.div`
  width: 5rem;
  height: 100%;
  ${mixin.flexCenter};
  cursor: pointer;
  .MuiSvgIcon-root {
    font-size: 2.5rem;
  }
`;
const Product__quantity = styled.div`
  ${mixin.flexCenter};
  flex: 1;
  height: 100%;
  border-left: 0.1rem solid ${theme.color.lightblack};
  border-right: 0.1rem solid ${theme.color.lightblack};
  font-size: 2.3rem;
  font-family: ${theme.font.ubuntu};
  font-weight: 400;
`;

const Product__notification = styled.div`
  ${mixin.flexCenter};
  margin: 1rem auto;
  color: ${theme.color.lightblack};
  font-family: ${theme.font.ubuntu};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  h3 {
    font-weight: 400;
    font-size: 1.6rem;
  }
`;

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [index, setIndex] = useState(0);
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState([]);
  const [{ user, basket }, dispatch] = useProductsContext();
  const [showNoti, setShowNoti] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const [updated, setUpdated] = useState(false);
  let hideNoti;

  const getDeliveryDate = () => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const today = new Date();
    today.setDate(new Date().getDate() + 2);

    return (
      `${month[today.getMonth()]}` +
      " " +
      `${today.getDate()}` +
      ", " +
      `${today.getFullYear()}`
    );
  };

  const handleRemove = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const findCategory = (category, index) => {
    const sameCategory = allProductsList.filter(
      (item) => item.category === category && item.order - 1 !== index
    );

    setCategory(sameCategory);
  };

  useEffect(() => {
    const currentProduct = allProductsList.find((product) => product.id === id);
    setProduct(currentProduct);
    const index = allProductsList.indexOf(currentProduct);
    setIndex(index);
    //get delivery date
    setDate(getDeliveryDate());
    // find similar products
    findCategory(currentProduct.category, index);
    setQuantity(1);
    setShowNoti(false);
    setDidMount(true);

    return () => {
      setDidMount(false);
    };
  }, [id]);

  useEffect(() => {
    setUpdated(true);
    return () => {
      setUpdated(false);
    };
  }, [basket]);

  const addToBasket = () => {
    if (updated) {
      dispatch({
        type: "ADD_TO_BASKET",
        payload: {
          id: product.id,
          productName: product.productName,
          price: product.price,
          imgUrl: product.imgUrl,
          quantity,
          subtotal: product.price * quantity,
        },
      });
      setQuantity(1);
      setShowNoti(true);
      hideNoti = setTimeout(function () {
        setShowNoti(false);
      }, 2000);
    }
  };

  if (!didMount) {
    return null;
  }

  return (
    <>
      <Product__container>
        <Product__imgContainer>
          <Product__img
            src={
              require(`../../Assets/images/${allProductsList[index].imgUrl}`)
                .default
            }
            alt="product image"
          ></Product__img>
        </Product__imgContainer>
        <Product__infoContainer>
          <h4>{product.category}</h4>
          <h1>{product.productName}</h1>
          <h6>${product.price}</h6>
          {product.inStock ? (
            <h5>
              Delivered by <span>{date}</span>
            </h5>
          ) : (
            ""
          )}
          <Product__rating>
            {Array(product.star)
              .fill()
              .map((_, index) => (
                <StarIcon key={index} />
              ))}
          </Product__rating>
          {!product.inStock ? <h6>Out of stock</h6> : <h6>In stock</h6>}

          {!product.inStock ? (
            ""
          ) : (
            <>
              <Product__quantityBox>
                <Product__count onClick={() => handleRemove()}>
                  <RemoveIcon />
                </Product__count>
                <Product__quantity>{quantity}</Product__quantity>
                <Product__count onClick={() => setQuantity(quantity + 1)}>
                  <AddIcon />
                </Product__count>
              </Product__quantityBox>
              <Product__addToBasket onClick={() => addToBasket()}>
                ADD TO BASKET
              </Product__addToBasket>
              <Product__notification show={showNoti}>
                <h3>Added to Basket Successfully</h3>
              </Product__notification>
            </>
          )}
        </Product__infoContainer>
      </Product__container>
      <Carousel
        slides={category.length}
        list={category}
        title="Similar Products"
      />
    </>
  );
}

export default ProductPage;
