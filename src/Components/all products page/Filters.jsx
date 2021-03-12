import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { theme, mixin, breakpoint } from "../style/styles";
import { useProductsContext } from "../context";
import { productsFilter, sortProducts } from "../../Assets/data/productsFilter";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const Filters__container = styled.form`
  ${mixin.flexBetween};
  ${mixin.maxWidth};
  ${mixin.padding};
  position: sticky;
  top: 8rem;
  z-index: 70;
  height: 5rem;
  border-top: 0.1rem solid ${theme.color.grey};
  border-bottom: 0.1rem solid ${theme.color.grey};
  background-color: ${theme.color.white};
  font-family: ${theme.font.ubuntu};
  @media ${breakpoint.tabletS} {
    display: grid;
    height: 10rem;
    padding: 0;
    position: relative;
    top: 0;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const Filters__filter = styled.div`
  ${mixin.flexCenter};
  height: 100%;
  /* position: relative; */
  @media ${breakpoint.tabletS} {
    padding: 0 7%;
    width: 100%;
  }
`;

const Filters__filterItem = styled.div`
  position: relative;
  margin-right: 2rem;
  height: 5rem;
  @media ${breakpoint.tabletS} {
    margin: auto;
  }
`;

const Filters__filterItemLabel = styled.div`
  width: 100%;
  height: 100%;
  ${mixin.flexCenter};
  cursor: pointer;
  h3 {
    font-size: 1.5rem;
    font-weight: 400;
  }
  .MuiSvgIcon-root {
    font-size: 2rem;
    transform: translateY(5%);
    -webkit-transform: translateY(5%);
  }
`;

const Filters__filterArea = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 100%);
  -webkit-transform: translate(-50%, 100%);
  background-color: ${theme.color.white};
  grid-gap: 1.8rem;
  padding: 2rem;
  display: none;
  max-width: 15rem !important;
  min-width: 10rem !important;
  border: 0.1rem solid ${theme.color.grey};
  &.show {
    display: grid;
  }
  @media ${breakpoint.mobileL} {
    padding: 2rem 0.8rem 2rem 0.5rem;
  }
`;

const Filters__input = styled.input`
  margin-right: 0.3rem;
`;
const Filters__label = styled.label`
  display: flex;
  font-size: 1.5rem;
  font-weight: 400;
`;

const Filters__sort = styled.div`
  ${mixin.flexCenter};
  height: 100%;
  flex: 1;
  justify-content: flex-end;
  margin-right: 3rem;
  @media ${breakpoint.tabletS} {
    grid-row: 1;
    justify-content: center;
    border-bottom: 0.1rem solid ${theme.color.grey};
    width: 100%;
  }
  .sort__label {
    padding-right: 0.7rem;
    border-right: 0.15rem solid ${theme.color.black};
  }
  .MuiSvgIcon-root {
    font-size: 2rem;
    transform: translateY(5%);
    -webkit-transform: translateY(5%);
  }
`;

const Filters__select = styled.select`
  font-size: 1.5rem;
  font-weight: 400;
  font-family: ${theme.font.ubuntu};
  width: fit-content;
  margin-left: 0.7rem;
  background-color: transparent;
  appearance: none;
  cursor: pointer;
`;

const Filters__clear = styled.button`
  background: transparent;
  font-size: 1.3rem;
  font-family: ${theme.font.ubuntu};
  cursor: pointer;
  @media ${breakpoint.tabletS} {
    display: none;
  }
`;

function Filters() {
  const [{ sort }, dispatch] = useProductsContext();
  const filterRef = useRef([]);
  const filterAreaRef = useRef(null);

  // default: check 'all' options
  const checkAll = () => {
    const inputEle = document.querySelectorAll("input");
    for (let i = 0; i < inputEle.length; i++) {
      if (inputEle[i].value === "All") {
        inputEle[i].checked = true;
      }
    }
  };
  useEffect(() => {
    checkAll();
  }, []);

  // close filters once click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterAreaRef.current && !filterAreaRef.current.contains(e.target)) {
        for (let i = 0; i < filterRef.current.length; i++) {
          filterRef.current[i].classList.remove("show");
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterAreaRef]);

  const filterItems = (e) => {
    const checkedItems = Array.from(
      filterAreaRef.current.querySelectorAll("input:checked")
    );
    const checkedList = checkedItems.map((item) => {
      return { name: item.name, value: item.value };
    });

    dispatch({
      type: "FILTER",
      payload: checkedList,
    });
  };

  const sortItems = (e) => {
    const sortValue = e.target.value;
    dispatch({
      type: "SORT",
      payload: sortValue,
    });
  };

  const clearFilter = () => {
    const checkedItems = document.querySelectorAll("input:checked");
    for (let i = 0; i < checkedItems.length; i++) {
      checkedItems[i].checked = false;
    }
    checkAll();
    dispatch({
      type: "CLEAR_FILTER",
    });
  };

  const showFilterArea = (e) => {
    const filterArea = e.currentTarget.nextSibling;
    for (let i = 0; i < filterRef.current.length; i++) {
      if (filterRef.current[i] === filterArea) {
        filterRef.current[i].classList.toggle("show");
      } else {
        filterRef.current[i].classList.remove("show");
      }
    }
  };

  const hideFilterArea = () => {
    for (let i = 0; i < filterRef.current.length; i++) {
      filterRef.current[i].classList.remove("show");
    }
  };
  return (
    <Filters__container>
      {/* filter */}
      <Filters__filter ref={filterAreaRef}>
        {productsFilter.map((item, index) => {
          return (
            <Filters__filterItem
              key={index}
              onMouseLeave={() => hideFilterArea()}
            >
              <Filters__filterItemLabel
                onClick={(e) => showFilterArea(e)}
                onMouseEnter={(e) => showFilterArea(e)}
              >
                <h3>{item.label}</h3>
                <ExpandMoreIcon />
              </Filters__filterItemLabel>
              <Filters__filterArea
                ref={(el) => (filterRef.current[index] = el)}
              >
                {item.categories.map((option, index) => {
                  return (
                    <Filters__label
                      key={index}
                      onChange={(e) => filterItems(e)}
                      htmlFor={option}
                    >
                      <Filters__input
                        type="radio"
                        name={item.label}
                        value={option}
                        id={option}
                      />
                      {option}
                    </Filters__label>
                  );
                })}
              </Filters__filterArea>
            </Filters__filterItem>
          );
        })}
      </Filters__filter>

      {/* sort */}
      <Filters__sort>
        <Filters__label htmlFor="sort" className="sort__label">
          Sort by
        </Filters__label>
        <Filters__select id="sort" value={sort} onChange={(e) => sortItems(e)}>
          {sortProducts.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </Filters__select>
        <ExpandMoreIcon />
      </Filters__sort>

      {/* reset */}
      <Filters__clear type="button" onClick={() => clearFilter()}>
        Clear filter
      </Filters__clear>
    </Filters__container>
  );
}

export default Filters;
