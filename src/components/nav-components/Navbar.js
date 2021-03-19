import React, { useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from "../../assets/logo.svg";
import { Sidebar } from "../general-components";

const navLinks = [
  { id: 1, text: "home", url: "/" },
  { id: 2, text: "movies", url: "/movies" },
  { id: 3, text: "series", url: "/series" },
];

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <StyledHeader>
      <div className="content">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <button type="button" className="btn icon-btn" onClick={toggleSidebar}>
          <FaBars className="icon" />
        </button>
        <Sidebar toggleSidebar={toggleSidebar} showSidebar={showSidebar}>
          <nav className="sidebar-nav">
            <ul className="sidebar-links">
              {navLinks.map(link => {
                return (
                  <li key={link.id}>
                    <Link to={link.url} onClick={toggleSidebar}>
                      {link.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Sidebar>
        <nav className="main-nav">
          <ul className="nav-links">
            {navLinks.map(link => {
              return (
                <li key={link.id}>
                  <Link to={link.url} className={location.pathname === link.url ? `active` : null}>
                    <span>{link.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </StyledHeader>
  );
};

export default Navbar;

const StyledHeader = styled.header`
  width: 100%;
  background: var(--clr-secondary-dark);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 0.25rem 0;

  .content {
    margin: 0 auto;
    min-height: 8vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
  }

  .logo {
    height: 1.5rem;
  }

  .main-nav {
    display: none;
  }

  .nav-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 14rem;

    a,
    a:visited {
      color: var(--clr-font-light);
      font-size: 1.125rem;
      position: relative;
      text-transform: capitalize;
    }

    a::after {
      content: "";
      width: 100%;
      height: 2px;
      background: var(--clr-primary);
      position: absolute;
      top: 100%;
      left: 0;
      transform: translateY(10px);
      opacity: 0;
      transition: opacity 0.5s ease, transform 0.5s ease;
    }

    a:hover,
    .active,
    .active:visited {
      color: var(--clr-primary);
    }

    a:hover::after,
    .active::after {
      transform: translateY(4px);
      opacity: 1;
    }
  }

  .sidebar-links {
    li:first-child {
      border-top: 1px solid var(--clr-font-medium);
    }

    li {
      border-bottom: 1px solid var(--clr-font-medium);
    }
    li:hover {
      background: var(--clr-primary-light);
      a {
        color: var(--clr-primary-dark);
        transform: translateX(1rem);
      }
    }

    a,
    a:visited {
      color: var(--clr-font);
      display: block;
      padding: 1.5rem 0;
      font-size: 1.5rem;
      padding-left: 3rem;
      text-transform: capitalize;
      transition: transform 0.2s ease;
    }
  }

  @media screen and (min-width: 800px) {
    .icon-btn {
      display: none;
    }

    .main-nav {
      display: block;
    }
  }
`;
