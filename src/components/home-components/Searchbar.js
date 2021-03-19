import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FiSearch, FiX } from "react-icons/fi";
import film from "../../assets/film.svg";
import { useSearchContext } from "../../context/searchContext";

const radios = [
  { value: "multi", label: "All" },
  { value: "movie", label: "Movies" },
  { value: "tv", label: "Series" },
  { value: "person", label: "People" },
];

const Searchbar = () => {
  const { query, setQuery, category, setCategory, clearSearch } = useSearchContext();
  const inputEl = useRef(null);
  const [text, setText] = useState(query);

  //if there is a search state search else clear the search
  const handleSubmit = e => {
    e.preventDefault();
    inputEl.current.blur();
    if (text.length > 0) {
      setQuery(text);
    } else {
      clearSearch();
    }
  };

  const handleClear = () => {
    setText("");
    clearSearch();
  };

  return (
    <StyledSearchbar>
      <div className="content">
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input type="text" ref={inputEl} value={text} onChange={e => setText(e.target.value)} />
            <button type="submit" className="btn icon-btn search-btn">
              <FiSearch className="icon" />
            </button>
            {query.length > 0 && (
              <button type="button" className="btn icon-btn clear-btn" onClick={handleClear}>
                <FiX className="icon" />
              </button>
            )}
          </div>

          {query.length > 0 && (
            <div className="radio-wrapper">
              {radios.map((radio, index) => (
                <label htmlFor={radio.value} key={index}>
                  <input
                    type="radio"
                    value={radio.value}
                    id={radio.value}
                    name="search-category"
                    checked={category === radio.value}
                    onChange={e => setCategory(e.target.value)}
                  />
                  <span className="radio-label">{radio.label}</span>
                </label>
              ))}
            </div>
          )}
        </form>
      </div>
    </StyledSearchbar>
  );
};

export default Searchbar;

const StyledSearchbar = styled.section`
  background-image: url(${film});
  background-repeat: no-repeat;
  background-size: 250%;
  background-position: center;
  background-color: var(--clr-primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.25rem 0;

  .content {
    padding: 0;
  }

  .input-wrapper {
    width: 100%;
    margin: 0 auto;
    height: 2.25rem;
    position: relative;
    input {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      border-color: transparent;
      padding: 0.75rem 1.125rem;
      outline: none;
      font-size: 1rem;
      color: var(--clr-font);
      &:focus {
        box-shadow: 0 0 0 2px var(--clr-secondary-dark), 0 0 0 3px white;
        -moz-box-shadow: 0 0 0 2px var(--clr-secondary-dark), 0 0 0 3px white;
        -webkit-box-shadow: 0 0 0 2px var(--clr-secondary-dark), 0 0 0 3px white;
        color: var(--clr-font-dark);
      }
    }
  }

  .icon-btn {
    height: 100%;
    top: 0;
    background: transparent;
    box-shadow: none;
    position: absolute;

    .icon {
      font-size: 1.125rem;
      stroke-width: 3;
    }
  }

  .search-btn {
    right: 0;
    padding: 0.5rem 0.75rem;

    &:focus {
      outline: none;
      border-radius: 0;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      box-shadow: inset 0 0 0 2px var(--clr-secondary-dark), 0 0 0 1px white;
      -moz-box-shadow: inset 0 0 0 2px var(--clr-secondary-dark), 0 0 0 1px white;
      -webkit-box-shadow: inset 0 0 0 2px var(--clr-secondary-dark), 0 0 0 1px white;
    }

    .icon {
      color: var(--clr-primary);
    }
  }

  .clear-btn {
    right: 2.5rem;
    .icon {
      color: var(--clr-font);
    }
  }

  .radio-wrapper {
    margin: 1.5rem auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    color: var(--clr-font-dark);

    input[type="radio"]:checked + .radio-label {
      background: rgba(236, 236, 236, 0.75);
      color: var(--clr-font-dark);
    }
    .radio-label {
      padding: 0.375rem 0.75rem 0.375rem 0.375rem;
    }
    .radio-label:hover {
      background: rgba(236, 236, 236, 0.75);
      color: var(--clr-font-dark);
    }
    input[type="radio"]:focus + .radio-label {
      box-shadow: inset 0 0 0 2px var(--clr-primary);
    }
    input[type="radio"]:focus + .radio-label:before {
      border: 2px solid var(--clr-primary-dark);
    }
    input[type="radio"]:checked + .radio-label {
      background: rgba(236, 236, 236, 0.75);
    }
    label {
      margin: 0 0.75rem 0.25rem;
    }
  }

  @media screen and (min-width: 600px) {
    background-size: 150%;
    .radio-wrapper {
      justify-content: center;
      label {
        margin: 0 1rem;
        font-size: 1rem;
      }
      .radio-label {
        padding: 0.5rem 1rem 0.5rem 0.5rem;
      }
    }
  }

  @media screen and (min-width: 800px) {
    background-size: 125%;
    .search-form {
      .input-wrapper {
        width: 70%;
      }
    }
  }

  @media screen and (min-width: 1000px) {
    background-size: 105%;
    .search-form {
      .input-wrapper {
        width: 60%;
      }
    }
  }
`;
