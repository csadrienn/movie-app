import React, { useState } from "react";
import styled from "styled-components";
import { FaFilter, FaSort } from "react-icons/fa";
import Sidebar from "../general-components/Sidebar";
import Sort from "./Sort";
import Filter from "./Filter";

const SmallScreenFilters = ({ type }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sideBarContent, setSidebarContent] = useState("sort");

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <StyledFilters>
      <button
        type="button"
        className="btn filter-btn control-btn"
        onClick={() => {
          setSidebarContent("filter");
          toggleSidebar();
        }}
      >
        <FaFilter className="icon" /> Filters
      </button>
      <button
        type="button"
        className="btn sort-btn control-btn"
        onClick={() => {
          setSidebarContent("sort");
          toggleSidebar();
        }}
      >
        <FaSort className="icon" /> Sort
      </button>
      <Sidebar toggleSidebar={toggleSidebar} showSidebar={showSidebar}>
        <div className="sidebar-content">
          {sideBarContent === "sort" ? (
            <Sort isDesktop={false} type={type} toggleSidebar={toggleSidebar} />
          ) : (
            <Filter isDesktop={false} type={type} toggleSidebar={toggleSidebar} />
          )}
        </div>
      </Sidebar>
    </StyledFilters>
  );
};

export default SmallScreenFilters;

const StyledFilters = styled.section`
  padding: 3rem 0 2rem;
  display: flex;
  justify-content: flex-end;

  .control-btn {
    display: flex;
    align-items: center;
    .icon {
      margin-right: 0.25rem;
      font-size: 0.75rem;
    }
  }
  .filter-btn {
    margin-right: 1rem;
  }

  .sidebar-content {
    padding: 0 2rem 2rem;
    h4 {
      color: var(--clr-font-dark);
    }
    span {
      margin-bottom: 0.75rem;
    }
  }
`;
