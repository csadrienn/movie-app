import React from "react";
import { FiX } from "react-icons/fi";
import styled from "styled-components";

const Sidebar = ({ showSidebar, toggleSidebar, children }) => {
  return (
    <>
      <StyledContent className={showSidebar ? "active" : null}>
        <button type="button" className="btn icon-btn close-btn" onClick={toggleSidebar}>
          <FiX className="icon" />
        </button>
        <div className="content-wrapper">{children}</div>
      </StyledContent>
      <StyledBcg className={showSidebar ? "active" : null}></StyledBcg>
    </>
  );
};

export default Sidebar;

const StyledContent = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  background: var(--clr-bcg-light);
  width: 70%;
  min-width: 250px;
  max-width: 400px;
  height: 100vh;
  height: max-content;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 150;

  .content-wrapper {
    padding-top: 8vh;
    z-index: 160;
    height: 100vh;
    position: relative;
    overflow-y: auto;
    overflow-x: visible;
    color: var(--clr-font-dark);
    h3,
    h4,
    h5,
    .icon {
      color: var(--clr-font-dark);
    }
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    left: -2.5rem;
    opacity: 0;
    pointer-events: none;
    transform: scale(0);
    transition: opacity 0.1s ease-out 0s, transform 0.1s ease-out 0s;
    z-index: 160;
  }

  .icon {
    stroke-width: 3px;
  }

  &.active {
    transform: translateX(0);

    .close-btn {
      transform: scale(1);
      opacity: 1;
      pointer-events: all;
      transition: opacity 0.1s ease-out 0.35s, transform 0.1s ease-out 0.35s;
    }
  }
  @media screen and (min-width: 800px) {
    display: none;
  }
`;

const StyledBcg = styled.div`
  background: rgba(18, 20, 21, 0.8);
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  transition: opacity 0.1s linear, transform 0ms linear 0.1s;
  z-index: 100;
  opacity: 0;
  transform: scale(0);

  &.active {
    transform: scale(1);
    opacity: 1;
    transition: opacity 0.1s linear;
  }

  @media screen and (min-width: 800px) {
    display: none;
  }
`;
