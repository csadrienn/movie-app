import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDiscoverContext } from "../../context/discoverContext";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { ratingOptions, releaseOptions, runtimeOptions } from "../../utils/data";

const radios = [
  { name: "ratings", radioGroup: ratingOptions, expanded: false },
  { name: "released", radioGroup: releaseOptions, expanded: false },
  { name: "runtime", radioGroup: runtimeOptions, expanded: false },
];

const Filter = ({ type, isDesktop, toggleSidebar }) => {
  const { filters, setFilters, movieGenres, seriesGenres, clearFilters } = useDiscoverContext();
  const [genresExpanded, setGenresExpanded] = useState(false);
  const [radioList, setRadioList] = useState(radios);
  const [genres, setGenres] = useState(type === "movie" ? [...movieGenres] : [...seriesGenres]);
  const [filtersActive, setFiltersActive] = useState(false);

  //gear the genres to the types
  useEffect(() => {
    setGenres(type === "movie" ? [...movieGenres] : [...seriesGenres]);
    setRadioList(radios);
    setFiltersActive(false);
    setGenresExpanded(false);
  }, [type]);

  //check if the filters are empty
  useEffect(() => {
    let isFiltersEmpty = true;
    const filterValues = Object.values(filters);
    filterValues.forEach(value => {
      if (value.length > 0) {
        isFiltersEmpty = false;
        return;
      }
    });
    setFiltersActive(!isFiltersEmpty);
  }, [filters]);

  const closeSidebar = () => {
    if (!isDesktop) {
      toggleSidebar();
    }
  };

  //show and hide the filter group
  const setFilterExpanded = name => {
    const newRadioList = [...radioList].map(radio => {
      if (radio.name === name) {
        radio.expanded = !radio.expanded;
      }
      return radio;
    });
    setRadioList(newRadioList);
  };

  //toggle between active and passive state of a genre button
  const handleGenreClick = (e, active) => {
    const id = parseInt(e.target.dataset.id);
    //change the filters in the context
    let newFilteredGenres;
    if (active) {
      newFilteredGenres = filters.genres.filter(genreId => genreId !== id);
    } else {
      newFilteredGenres = [...filters.genres, id];
    }
    setFilters("genres", newFilteredGenres);
    //change the visible state of the button
    const changedGenres = genres.map(genre => {
      if (genre.id == id) {
        genre.active = !genre.active;
      }
      return genre;
    });
    setGenres(changedGenres);
    window.scrollTo(0, 0);
  };

  const handleClearFilters = () => {
    const changedGenres = genres.map(genre => {
      return { ...genre, active: false };
    });
    setGenres(changedGenres);
    clearFilters();
    window.scrollTo(0, 0);
  };

  return (
    <StyledFilter
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      {isDesktop ? (
        <h3 className="title">Filters</h3>
      ) : (
        <div className="title-wrapper">
          <h3>Filters</h3>
          <button
            type="button"
            className={`btn text-btn clear-btn ${filtersActive ? "active" : null}`}
            onClick={handleClearFilters}
          >
            Clear
          </button>
        </div>
      )}

      <div className="filter-content">
        {radioList.map((radio, index) => {
          const { name, radioGroup, expanded } = radio;

          return (
            <div className="filter-group" key={index}>
              <button
                type="button"
                className="btn text-btn title-btn"
                onClick={() => setFilterExpanded(name)}
              >
                <h4>{name}</h4>
                {expanded ? <FiChevronUp className="icon" /> : <FiChevronDown className="icon" />}
              </button>

              {expanded && (
                <div className="radios">
                  {radioGroup.map(option => {
                    const { id, text, value } = option;
                    return (
                      <label htmlFor={text} key={id}>
                        <input
                          type="radio"
                          value={value}
                          id={text}
                          name={name}
                          checked={filters[name] === value}
                          onChange={e => {
                            setFilters(name, e.target.value);
                            window.scrollTo(0, 0);
                          }}
                        />
                        <span className="radio-label">{text}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        <div className="filter-group">
          <button
            type="button"
            className="btn text-btn title-btn"
            onClick={() => setGenresExpanded(!genresExpanded)}
          >
            <h4>Genres</h4>
            {genresExpanded ? <FiChevronUp className="icon" /> : <FiChevronDown className="icon" />}
          </button>
          <ul className="genres">
            {genresExpanded &&
              genres.map(genre => {
                const { id, name, active } = genre;

                return (
                  <li key={id}>
                    <button
                      type="button"
                      data-id={id}
                      className={`btn genre-btn ${active ? "active" : ""}`}
                      onClick={e => handleGenreClick(e, active)}
                    >
                      {name}
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
        {isDesktop ? (
          <button
            type="button"
            className={`btn bottom-btn ${filtersActive ? "active" : null}`}
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        ) : (
          <button
            type="button"
            className={`btn bottom-btn ${filtersActive ? "active" : null}`}
            onClick={closeSidebar}
          >
            Done
          </button>
        )}
      </div>
    </StyledFilter>
  );
};

export default Filter;
const StyledFilter = styled.form`
  border-radius: var(--border-radius);

  .title,
  .title-wrapper {
    margin-bottom: 1.25rem;
  }

  .title-wrapper,
  .title-btn {
    display: flex;
    justify-content: space-between;
  }

  .title-wrapper {
    align-items: baseline;

    .clear-btn {
      color: rgb(175, 27, 27);
    }
  }

  .title-btn {
    text-decoration: none;
    align-items: center;
    width: 100%;
    margin: 0 0 0.75rem;
    h4 {
      margin: 0;
    }

    .icon {
      font-size: 1.25rem;
    }
    &:hover {
      color: var(--clr-font-light);
    }
  }
  .icon {
    font-size: 1.5rem;
  }
  .radios {
    margin-bottom: 0.75rem;
  }

  .clear-btn,
  .bottom-btn {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.1s ease-in-out;

    &.active {
      opacity: 1;
      pointer-events: all;
    }
  }

  .bottom-btn {
    width: 100%;
  }

  .filter-group {
    margin-bottom: 0.25rem;
  }

  .genres {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0.75rem;
    li {
      margin: 0.375rem 0.5rem 0.375rem 0;
    }
    .genre-btn {
      background: rgba(236, 236, 236, 0.75);
      border: 2px solid var(--clr-font-light);
      border-radius: 99rem;
      color: var(--clr-font-dark);
      outline: none;
      &:hover,
      &:focus {
        background: var(--clr-primary-light);
        border-color: var(--clr-primary);
      }
      &.active {
        background: var(--clr-primary);
        border-color: var(--clr-primary-dark);
      }
    }
  }
`;
