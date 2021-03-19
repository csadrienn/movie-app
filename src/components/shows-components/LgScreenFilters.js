import React from "react";
import styled from "styled-components";
import Sort from "./Sort";
import Filter from "./Filter";

const LgScreenFilters = ({ type }) => {
  return (
    <StyledFilterSidebar>
      <div className="fixed-content">
        <Sort isDesktop={true} type={type} />
        <Filter isDesktop={true} type={type} />
      </div>
    </StyledFilterSidebar>
  );
};

export default LgScreenFilters;

const StyledFilterSidebar = styled.section`
  padding: 3rem 1rem 1rem 0;
  max-width: 17.5rem;
  width: 17.5rem;
  min-height: 92vh;
  position: relative;
  color: var(--clr-font-light);

  form {
    margin-bottom: 2rem;
  }
`;
