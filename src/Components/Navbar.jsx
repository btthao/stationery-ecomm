import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { links } from "../Assets/data/navLinks";
import { theme, breakpoint, mixin } from "./style/styles";
import PersonIcon from "@material-ui/icons/Person";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import { useProductsContext } from "./context";

const Nav = styled.nav`
  ${mixin.flexBetween};
  ${mixin.maxWidth};
  ${mixin.transition};
  ${mixin.padding};
  position: sticky;
  top: 0;
  height: 8rem;
  background: ${theme.color.white};
  z-index: 100;
  padding-right: 3rem;
  border-bottom: 0.1rem solid ${theme.color.grey};
  @media ${breakpoint.tabletS} {
    padding: 0 0.7rem;
  }
  & > * {
    height: 3rem;
  }
`;

const NavLogo = styled(Link)`
  ${mixin.links};
  ${mixin.flexCenter};
  font-size: 2.8rem;
  font-weight: 600;
  color: ${theme.color.black};
  @media ${breakpoint.mobileL} {
    font-size: 2.2rem;
  }
`;

const NavMenu = styled.div`
  ${mixin.flexEven};
  width: 40%;
  @media ${breakpoint.tabletL} {
    background-color: ${theme.color.white};
    position: absolute;
    top: 8rem;
    opacity: ${({ show }) => (show ? "1" : "0")};
    left: ${({ show }) => (show ? "0" : "-70rem")};
    z-index: 100;
    flex-direction: column;
    justify-content: flex-start;
    width: 35rem;
    height: calc(100vh - 8rem);
    ${mixin.transition};
    overflow: scroll;
  }
  @media ${breakpoint.mobileL} {
    width: 100%;
    min-height: 100vh;
  }
`;

const NavMenu__links = styled(Link)`
  ${mixin.links};
  ${mixin.transition};
  font-size: 1.6rem;
  font-weight: 500;
  padding: 0 0.2rem;
  color: ${theme.color.black};
  &:hover {
    background-color: ${theme.color.lightpink};
  }
  @media ${breakpoint.tabletL} {
    ${mixin.flexCenter};
    border-top: 0.1rem solid ${theme.color.grey};
    width: 100%;
    height: 5rem;
  }
`;

const NavUser = styled.div`
  ${mixin.flexCenter};
  justify-content: flex-end;
  @media ${breakpoint.tabletL} {
    width: 6rem;
    padding-right: 0.2rem;
  }
`;

const NavUser__item = styled(Link)`
  ${mixin.links};
  display: inline-block;
  height: 2.5rem;
  width: 2.5rem;
  color: ${theme.color.black};
  &:nth-child(2) {
    margin-left: 1.5rem;
    @media ${breakpoint.tabletL} {
      margin-left: 0;
    }
  }
  &:nth-child(1) {
    @media ${breakpoint.tabletL} {
      display: none;
    }
  }
  .MuiSvgIcon-root {
    font-size: 2.5rem;
  }
`;

const NavUser__basket = styled.div`
  height: 2.7rem;
  width: 2.7rem;
  border-radius: 50%;
  ${mixin.flexCenter};
  font-size: 1.3rem;
  font-family: ${theme.font.ubuntu};
  color: ${theme.color.black};
  background-color: ${theme.color.pinkish};

  @media ${breakpoint.mobileL} {
    width: 2.2rem;
    height: 2.2rem;
    font-size: 1rem;
  }
`;

const NavMobile = styled.div`
  display: none;
  @media ${breakpoint.tabletL} {
    width: 4.5rem;
    display: block;
    ${mixin.flexCenter};
    justify-content: flex-start;
    color: ${theme.color.black};
  }
  .MuiSvgIcon-root {
    font-size: 3.2rem;
    cursor: pointer;
  }
`;

const PageCover = styled.div`
  position: absolute;
  top: 8rem;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.6);
  z-index: 90;
  opacity: ${({ cover }) => (cover ? "1" : "0")};
  visibility: ${({ cover }) => (cover ? "visible" : "hidden")};
  ${mixin.transition};
  @media ${breakpoint.mobileL} {
    display: none;
  }
`;

function Navbar() {
  // show sideNav on mobile
  const [showNav, setShowNav] = useState(false);

  //change login area to sideNav
  const [loginSideNav, setLoginSideNav] = useState(false);

  const [{ basket, user }] = useProductsContext();

  const checkSize = () => {
    if (window.innerWidth <= 1024) {
      setLoginSideNav(true);
    } else {
      setLoginSideNav(false);
      setShowNav(false);
    }
  };

  const changePage = () => {
    setShowNav(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.addEventListener("resize", checkSize);
    checkSize();
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  return (
    <Nav>
      {/* cover whole page when nav is opened */}
      <PageCover cover={showNav} />
      {/* mobile icon */}
      <NavMobile>
        <MenuOutlinedIcon
          onClick={() => {
            setShowNav(!showNav);
          }}
        />
      </NavMobile>
      {/* logo text */}
      <NavLogo to="/" onClick={() => changePage()}>
        Statine
      </NavLogo>
      {/* menu */}
      <NavMenu show={showNav} showLogin={loginSideNav}>
        {links.map((link) => {
          const { id, url, name } = link;
          return (
            <NavMenu__links key={id} to={url} onClick={() => changePage()}>
              {name}
            </NavMenu__links>
          );
        })}

        {loginSideNav && (
          <NavMenu__links
            to={user ? "/user" : "/login"}
            onClick={() => changePage()}
          >
            Your Account
          </NavMenu__links>
        )}
      </NavMenu>
      {/* user, checkout area */}
      <NavUser>
        <NavUser__item
          to={user ? "/user" : "/login"}
          onClick={() => changePage()}
        >
          <PersonIcon />
        </NavUser__item>
        <NavUser__item to="/checkout" onClick={() => changePage()}>
          <LocalMallIcon />
        </NavUser__item>
        <NavUser__basket>
          {basket.reduce((total, item) => total + item.quantity, 0)}
        </NavUser__basket>
      </NavUser>
    </Nav>
  );
}

export default Navbar;
