import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Loading } from "../general-components";
import { formDate } from "../../utils/utils";
import { getImgUrl } from "../../utils/api";
import no_image185_land from "../../assets/no_image185_land.svg";

const Episode = ({ fetchingId, seasonDetailList, seasonId }) => {
  const [episodes, setEpisodes] = useState(null);

  useEffect(() => {
    let newEpisodes;
    //no fetching id means it is already saved in the list
    if (!fetchingId) {
      //filter the current episode in the fetched list
      newEpisodes = seasonDetailList.filter(currSeason => currSeason.id === seasonId);
      setEpisodes(newEpisodes[0].episodes);
    }
  }, [seasonDetailList]);

  //show and hide the full overview
  const toggleFullOverview = id => {
    const changedEpisodes = episodes.map(episode => {
      if (episode.id === id) {
        return { ...episode, isFullOverview: !episode.isFullOverview };
      }
      return episode;
    });
    setEpisodes(changedEpisodes);
  };

  if (!episodes) {
    return (
      <StyledEpisode>
        <Loading />
      </StyledEpisode>
    );
  }

  return (
    <StyledEpisode>
      {episodes.length > 0 && (
        <ul className="episodes">
          {episodes.map(episode => {
            const {
              air_date,
              id,
              name,
              still_path,
              overview,
              episode_number,
              isFullOverview,
            } = episode;
            const maxLength = 150;
            const shortOverview = `${overview.slice(0, maxLength)}${
              overview.length > maxLength ? "..." : ""
            }`;
            return (
              <li key={id}>
                <div className="img-wrapper">
                  <img
                    src={still_path ? getImgUrl("w185", still_path) : no_image185_land}
                    alt={name}
                  />
                </div>
                <div className="text-wrapper">
                  <div className="episode-head">
                    <h5>
                      {episode_number}. {name}
                    </h5>
                    {air_date && <span className="date">{formDate(air_date)}</span>}
                  </div>
                  <p>
                    {isFullOverview ? overview : shortOverview}
                    {overview.length > maxLength && (
                      <button
                        type="button"
                        className="btn text-btn"
                        onClick={() => toggleFullOverview(id)}
                      >
                        {isFullOverview ? "less" : "read more"}
                      </button>
                    )}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </StyledEpisode>
  );
};

export default Episode;

const StyledEpisode = styled.section`
  margin: 0.75rem 0;
  li {
    display: flex;
    margin: 0.75rem 0;
    padding: 0.75rem;
    background: linear-gradient(to right, rgba(73, 79, 83, 0.8) 0%, rgba(73, 79, 83, 0) 100%);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .text-wrapper {
    width: 100%;
  }
  .episode-head {
    margin-bottom: 0.75rem;
    h5 {
      margin-bottom: 0;
    }
  }
  .img-wrapper {
    display: none;
  }

  @media screen and (min-width: 800px) {
    .episode-head {
      display: flex;
      justify-content: space-between;
    }
    .img-wrapper {
      display: block;
      margin-right: 1rem;
      border: none;
      box-shadow: none;
    }
  }
`;
