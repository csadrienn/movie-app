import React, { useState } from "react";
import styled from "styled-components";
import { sortOptions } from "../../utils/data";
import { useDiscoverContext } from "../../context/discoverContext";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const Sort = ({ isDesktop, type, toggleSidebar }) => {
  const { setSorting, sorting } = useDiscoverContext();
  const [expanded, setExpanded] = useState(true);
  const showOptions = !isDesktop || (isDesktop && expanded);

  const handleChange = e => {
    if (!isDesktop) {
      toggleSidebar();
    }
    setSorting(e.target.value);
  };

  return (
    <StyledSort
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      {isDesktop ? (
        <button
          className="btn text-btn title-btn"
          type="button"
          onClick={() => setExpanded(!expanded)}
        >
          <h3>Sort by</h3>
          {expanded ? <FiChevronUp className="icon" /> : <FiChevronDown className="icon" />}
        </button>
      ) : (
        <h3 className="title">Sort by</h3>
      )}

      {showOptions &&
        sortOptions.map(option => {
          const { id, type: optionType, text, value } = option;
          if (optionType === "multi" || optionType === type) {
            return (
              <label htmlFor={value} key={id}>
                <input
                  type="radio"
                  value={value}
                  id={value}
                  name="sort"
                  checked={sorting === value}
                  onChange={handleChange}
                />
                <span className="radio-label">{text}</span>
              </label>
            );
          }
          return null;
        })}
    </StyledSort>
  );
};

export default Sort;
const StyledSort = styled.form`
  border-radius: var(--border-radius);

  .title {
    margin-bottom: 1.25rem;
  }

  .title-btn {
    margin: 0 0 1.25rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    h3 {
      margin: 0;
    }
    &:hover {
      color: var(--clr-font-light);
    }
  }
  .icon {
    font-size: 1.5rem;
  }
`;
