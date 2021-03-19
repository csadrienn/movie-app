import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useDetailsContext } from "../../context/detailsContext";
import Episodes from "./Episodes";

const Seasons = () => {
  const { showDetails, fetchSeasonDetails, seasonDetails } = useDetailsContext();
  const [seasons, setSeasons] = useState(() => {
    return showDetails.seasons.map(season => {
      return { ...season, open: false };
    });
  });
  const [fetchedSeasonDetails, setFetchedSeasonDetails] = useState([]);
  const [fetchingId, setFetchingId] = useState(-1);

  //show and hide the episodes
  const toggleOpen = (id, seasonNum) => {
    const changedSeasons = seasons.map(season => {
      if (season.id === id) {
        season.open = !season.open;
      }
      return season;
    });

    setSeasons(changedSeasons);
    //if it is not saved already, fetched the data
    const currSeasonDetails = fetchedSeasonDetails.filter(details => details.id === id);
    if (currSeasonDetails.length === 0) {
      fetchSeasonDetails(showDetails.id, seasonNum);
      setFetchingId(id);
    }
  };

  useEffect(() => {
    //add to the fetched list
    if (fetchingId && seasonDetails) {
      const newFetchedSeasonDetails = [...fetchedSeasonDetails, seasonDetails];
      setFetchedSeasonDetails(newFetchedSeasonDetails);
      setFetchingId(null);
    }
  }, [seasonDetails]);

  return (
    <StyledSeasons>
      <h3>Seasons</h3>
      <section className="dark-section">
        <ul className="seasons">
          {seasons.map(season => {
            const { id, air_date, episode_count, name, season_number, open } = season;
            return (
              <li key={id}>
                <div className="season-head">
                  <div className="info">
                    <h4>{name}</h4>
                    <div className="span-wrapper">
                      <span>{air_date && air_date.length > 0 ? air_date.slice(0, 4) : "-"}</span>
                      <div className="separator"></div>
                      <span>
                        {episode_count} Episode{episode_count > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn text-btn expand-btn"
                    onClick={() => toggleOpen(id, season_number)}
                  >
                    {open ? <FaCaretUp className="icon" /> : <FaCaretDown className="icon" />}
                  </button>
                </div>
                {open && (
                  <Episodes
                    seasonId={id}
                    fetchingId={fetchingId}
                    seasonDetailList={fetchedSeasonDetails}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </StyledSeasons>
  );
};

export default Seasons;
const StyledSeasons = styled.article`
  .seasons {
    li {
      .season-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5rem;
      }

      &:first-child .season-head {
        .info {
          padding-top: 0;
        }
      }
    }
  }
  .info {
    padding: 0.75rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    border-bottom: 2px solid var(--clr-bcg);
    h4 {
      margin: 0 1.5rem 0.5rem 0;
    }
  }
  .span-wrapper {
    display: flex;
    align-items: center;
    .separator {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: var(--clr-font-medium);
      margin: 0 0.75rem;
    }
  }
  .expand-btn {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .icon {
    font-size: 2rem;
  }

  @media screen and (min-width: 500px) {
    .info {
      flex-direction: row;
      h4 {
        margin: 0 1.5rem 0 0;
      }
    }
  }
`;
