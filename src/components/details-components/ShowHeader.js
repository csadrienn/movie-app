import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReactPlayer from "react-player";
import no_image from "../../assets/no_image.svg";
import { FaStar } from "react-icons/fa";
import { FiPlayCircle } from "react-icons/fi";
import Modal from "./Modal";
import { useDetailsContext } from "../../context/detailsContext";
import { makeExternalLinkList } from "../../utils/utils";
import { getImgUrl } from "../../utils/api";

const ShowHeader = () => {
  const { showDetails, type } = useDetailsContext();

  //unify the property names
  let details;
  if (type === "movie") {
    const creators = showDetails.credits.crew.filter(
      crewMember => crewMember.job.toLowerCase() === "director"
    );
    details = { ...showDetails, creators, released: showDetails.release_date };
  } else {
    details = {
      ...showDetails,
      creators: showDetails.created_by,
      released: showDetails.first_air_date,
      title: showDetails.name,
      runtime: showDetails.episode_run_time[0],
      original_title: showDetails.original_name,
    };
  }

  const {
    backdrop_path,
    poster_path,
    title,
    tagline,
    vote_average,
    genres,
    overview,
    released,
    runtime,
    videos,
    original_title,
    creators,
    homepage,
    external_ids,
  } = details;
  const [showVideo, setShowVideo] = useState(false);
  const [isFullDesc, setIsFullDesc] = useState(overview.length < 250);
  const shortDesc = overview.length > 250 ? `${overview.slice(0, 250)}...` : overview;

  const allVideos = videos.results;
  const trailers = allVideos.filter(video => video.type === "Trailer");
  const video = trailers.length > 0 ? trailers[0] : allVideos[0];
  const youtubeBaseUrl = "https://www.youtube.com/watch?v=";
  const vimeoBaseUrl = "https://vimeo.com/";

  const closeModal = () => {
    setShowVideo(false);
  };

  const links = makeExternalLinkList(homepage, external_ids);

  return (
    <StyledShowHeader
      bcg_img={
        backdrop_path && backdrop_path.length > 0
          ? `url(${getImgUrl("original", backdrop_path)})`
          : "none"
      }
      bcg_clr={
        backdrop_path && backdrop_path.length > 0
          ? `var(--clr-secondary-dark)`
          : "var(--clr-secondary-medium)"
      }
    >
      <div className="content-bcg">
        <div className="infos content">
          <div className="img-wrapper">
            <img src={poster_path ? getImgUrl("w342", poster_path) : no_image} alt={title} />
            {allVideos.length > 0 && (
              <button type="button" className="play-btn" onClick={() => setShowVideo(true)}>
                <FiPlayCircle className="icon" />
              </button>
            )}
          </div>

          <h1 className="title">{title}</h1>
          <h2 className="italic-heading">{tagline}</h2>
          <div className="dark-section">
            <div className="first-line info-line">
              <span>{released.slice(0, 4)}</span>
              <div className="separator"></div>
              <span>{runtime}min</span>
            </div>
            <p className="info-line">
              <span>Original title: </span>
              {original_title}
            </p>
            <div className="rating info-line">
              <FaStar className="icon star-icon" />
              <span>{vote_average}/10</span>
            </div>
            <ul className="genres info-line">
              {genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>

            {creators.length > 0 && (
              <>
                <span>
                  {type === "movie" ? "Director" : "Creator"}
                  {creators.length > 1 ? "s: " : ": "}
                </span>
                <ul className="creators info-line">
                  {creators.map((creator, index) => (
                    <li key={creator.id}>
                      <Link to={`/person/${creator.id}`}>{creator.name}</Link>
                      {index !== creators.length - 1 ? "," : ""}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <ul className="links info-line">
              {links.map((link, index) => {
                const { icon, baseUrl, url } = link;

                if (url && url.length > 0) {
                  return (
                    <li key={index}>
                      <a href={`${baseUrl}${url}`} target="_blank">
                        {icon}
                      </a>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="desc">
        {overview ? (
          <p>
            {isFullDesc ? overview : shortDesc}
            {overview.length > shortDesc.length && (
              <button
                type="button"
                className="btn text-btn"
                onClick={() => setIsFullDesc(!isFullDesc)}
              >
                {isFullDesc ? "less" : "read more"}
              </button>
            )}
          </p>
        ) : (
          <p>Sorry, there is no decription for this {type}.</p>
        )}
      </div>
      {showVideo && (
        <Modal closeModal={closeModal}>
          <ReactPlayer
            url={`${video.site === "YouTube" ? youtubeBaseUrl : vimeoBaseUrl}${video.key}`}
            playing
            width="100%"
            height="100%"
            controls
          />
        </Modal>
      )}
    </StyledShowHeader>
  );
};

export default ShowHeader;
const StyledShowHeader = styled.header`
  .infos {
    display: grid;
    grid-gap: 0.5rem;
    padding-top: 3rem;
    margin-bottom: 0;
  }
  .title,
  .italic-heading {
    text-align: center;
  }

  .img-wrapper {
    max-height: 100%;
    height: auto;
    margin: 0 auto 0.5rem;
    max-width: 21.375rem;
    position: relative;
  }
  .play-btn {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: opactity 0.3s ease;
    opacity: 0;

    .icon {
      color: var(--clr-font-light);
      font-size: 4rem;
    }
    &:hover,
    &:focus {
      opacity: 1;
    }
  }

  .dark-section {
    span {
      font-weight: bold;
      margin-right: 0.25rem;
    }
  }
  .info-line {
    margin-bottom: 0.75rem;
  }

  .rating,
  .first-line {
    display: flex;
    align-items: center;
    span {
      font-weight: normal;
    }
  }

  .separator {
    background: var(--clr-font-medium);
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    margin: 0 1rem;
  }

  .genres {
    display: flex;
    flex-wrap: wrap;
    li {
      padding: 0 0.75rem;
      border-left: 1px solid var(--clr-font-medium);
    }
    li:first-child {
      padding-left: 0;
      border-left: none;
    }
  }

  .creators {
    display: inline-flex;
  }
  .links {
    display: flex;
    .icon {
      font-size: 1.25rem;
    }
  }

  .creators,
  .links {
    flex-wrap: wrap;
    a {
      color: var(--clr-font-medium);
      &:hover {
        color: var(--clr-primary);
      }
    }
    li {
      margin-right: 0.5rem;
    }
    li:last-child {
      margin-right: 0;
    }
  }
  .desc {
    width: 100%;
    text-align: justify;
    p {
      margin: 0 auto;
      width: var(--content-width-s);
    }
  }

  @media screen and (min-width: 800px) {
    .content-bcg {
      position: relative;
      background: ${props => props.bcg_clr};
      &::after {
        content: " ";
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.4;
        background-image: ${props => props.bcg_img};
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }
    }

    .infos {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 1rem;
      grid-template-rows: auto auto 1fr;
      padding-bottom: 2rem;
      .title,
      .italic-heading,
      .dark-section,
      .img-wrapper {
        z-index: 2;
      }
      .dark-section {
        margin: 0;
        height: 100%;
      }
    }

    .desc {
      background: var(--clr-secondary);
      border: 1px solid var(--clr-secondary-dark);
      box-shadow: var(--box-shadow);
      -moz-box-shadow: var(--box-shadow);
      -webkit-box-shadow: var(--box-shadow);
      border-radius: var(--border-radius);
      padding: 1rem 0;
      p {
        width: var(--content-width-l);
        max-width: var(--content-max-width);
      }
    }

    .title,
    .italic-heading {
      text-align: start;
    }

    .img-wrapper {
      grid-row: span 3;
      margin: 0;
      align-self: end;
    }
  }

  @media screen and (min-width: 1000px) {
    .infos {
      grid-template-columns: 2fr 3fr;
      grid-row-gap: 1rem;
      grid-column-gap: 2rem;
      max-width: 1050px;
    }

    .dark-section {
      padding: 2rem;
      max-width: 38rem;
      .info-line {
        margin-bottom: 1rem;
      }
    }
    .italic-heading,
    .title {
      max-width: 38rem;
    }
    .img-wrapper {
      justify-self: end;
    }
  }
`;
