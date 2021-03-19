import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDetailsContext } from "../../context/detailsContext";

const Filmography = () => {
  const { personDetails } = useDetailsContext();
  const cast = [];

  personDetails.combined_credits.cast.forEach(credit => {
    // check if this credit is already in the list
    const prev = cast.find(el => el.id === credit.id);
    const charAndEp = credit.episode_count
      ? `${credit.character}  (${credit.episode_count} ${
          credit.episode_count > 1 ? "episodes" : "episode"
        })`
      : credit.character;
    if (prev) {
      prev.charsEps.push(charAndEp);
    } else {
      //if it's not exist create a new object for the list based on the media type
      const isMovie = credit.media_type === "movie";
      const newCredit = {
        id: credit.id,
        type: credit.media_type,
        title: isMovie ? credit.title : credit.name,
        date: isMovie ? credit.release_date : credit.first_air_date,
        charsEps: [charAndEp],
      };
      cast.push(newCredit);
    }
  });

  const crew = personDetails.combined_credits.crew.map(credit => {
    const isMovie = credit.media_type === "movie";
    let newCredit = {
      id: credit.id,
      type: credit.media_type,
      title: isMovie ? credit.title : credit.name,
      date: isMovie ? credit.release_date : credit.first_air_date,
      job: credit.job,
      charsEps: isMovie
        ? []
        : [`(${credit.episode_count} ${credit.episode_count > 1 ? "episodes" : "episode"})`],
    };

    return newCredit;
  });

  const [filmography, setFilmography] = useState([
    { name: personDetails.gender === 1 ? "Actress" : "Actor", value: cast, isOpen: false },
  ]);

  useEffect(() => {
    let filmo = [...filmography];
    //create array of objects categorised based on the job
    crew.forEach(el => {
      let added = false;
      filmo.forEach(creditGroup => {
        if (creditGroup.name === el.job) {
          creditGroup.value.push(el);
          added = true;
        }
      });
      if (!added) {
        filmo.push({ name: el.job, value: [el], isOpen: false });
      }
    });
    //sorting by the number of credits in the job categories
    filmo = filmo
      .sort((creditGroup1, creditGroup2) => creditGroup2.value.length - creditGroup1.value.length)
      .map(creditGroup => {
        //sorting the credits by time date descending
        return {
          ...creditGroup,
          value: creditGroup.value.sort((credit1, credit2) => {
            // empty dates go first
            const date1 = credit1.date === "" ? new Date("6000") : new Date(credit1.date);
            const date2 = credit2.date === "" ? new Date("6000") : new Date(credit2.date);
            return date2 - date1;
          }),
        };
      });

    filmo[0].isOpen = true;
    setFilmography(filmo);
  }, []);

  const setActiveGroup = name => {
    const newFilmo = [...filmography];
    newFilmo.map(creditGroup => {
      if (creditGroup.name === name) {
        creditGroup.isOpen = !creditGroup.isOpen;
      }
    });
    setFilmography(newFilmo);
  };

  return (
    <StyledFilmography>
      <h3>Filmography</h3>
      <div className="dark-section">
        {filmography.map((creditGroup, index) => {
          return (
            <div className="credit-group" key={index}>
              <button
                type="button"
                className={creditGroup.isOpen ? "btn credit-btn open" : "btn credit-btn"}
                onClick={() => setActiveGroup(creditGroup.name)}
              >
                <h4>
                  {creditGroup.name} ({creditGroup.value.length})
                </h4>

                {creditGroup.isOpen ? (
                  <FaCaretUp className="icon" />
                ) : (
                  <FaCaretDown className="icon" />
                )}
              </button>
              {creditGroup.isOpen && (
                <ul className="credit-list">
                  {creditGroup.value.map((credit, index) => {
                    const strChars = credit.charsEps.join(", ");

                    return (
                      <li key={`${credit.id}${index}`} className="credit">
                        <div className="left-info">
                          <Link
                            to={
                              credit.type === "movie"
                                ? `/movie/${credit.id}`
                                : `/series/${credit.id}`
                            }
                          >
                            {credit.title}
                          </Link>
                          <p>{strChars}</p>
                        </div>
                        <p className="date">{credit.date ? credit.date.slice(0, 4) : null}</p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </StyledFilmography>
  );
};

export default Filmography;

const StyledFilmography = styled.article`
  margin-top: 2rem;

  .credit-btn {
    width: 100%;
    background: var(--clr-primary-trans);
    -moz-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.4);
    -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.4);
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    border-radius: var(--border-radius);
    &.open {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:hover {
      .icon {
        color: var(--clr-font-light);
      }
      background: var(--clr-primary-trans2);
    }

    h4 {
      margin: 0;
      text-align: start;
    }
    .icon {
      font-size: 1.5rem;
    }
  }

  .credit-list {
    padding: 0.75rem;
    background: linear-gradient(rgba(73, 79, 83, 0.7) 0%, rgba(73, 79, 83, 0.15) 100%);
  }
  .credit {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem;
    margin-top: 0.5rem;
    border-bottom: 1px solid var(--clr-secondary-dark);
    .date {
      text-align: center;
    }
    .left-info {
      margin-right: 1.5rem;
      a {
        color: var(--clr-font-light);
        &:hover {
          color: var(--clr-primary);
        }
      }
    }
  }
`;
