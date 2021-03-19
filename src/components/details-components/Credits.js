import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getImgUrl } from "../../utils/api";
import { useViewport } from "../../utils/viewport";
import { Link } from "react-router-dom";
import no_image from "../../assets/no_image.svg";
import { useDetailsContext } from "../../context/detailsContext";

const Credits = () => {
  const { width } = useViewport();
  const { showDetails, type } = useDetailsContext();
  const isMovie = type === "movie";

  const credits = isMovie ? showDetails.credits : showDetails.aggregate_credits;
  const [showAll, setShowAll] = useState(false);
  const [visibleCast, setVisibleCast] = useState(() =>
    width > 800 ? credits.cast.slice(0, 5) : credits.cast.slice(0, 3)
  );

  useEffect(() => {
    setVisibleCast(() => (width > 800 ? credits.cast.slice(0, 5) : credits.cast.slice(0, 3)));
  }, [width]);

  //create a list of objects based on the departments
  let crewDepartments = [];
  credits.crew.forEach(crewMember => {
    let added = false;
    crewDepartments.forEach(dep => {
      if (dep.name === crewMember.department) {
        dep.value.push(crewMember);
        added = true;
      }
    });
    if (!added) {
      crewDepartments.push({ name: crewMember.department, value: [crewMember] });
    }
  });
  //show the longest first
  crewDepartments.sort((dep1, dep2) => dep1.value.length - dep2.value.length);

  return (
    <StyledCredits>
      <div className="head">
        <h3>Credits</h3>
        <button className="btn text-btn" onClick={() => setShowAll(!showAll)}>
          {!showAll ? "Show full cast and crew" : "Show less"}
        </button>
      </div>
      <div className="dark-section">
        {!showAll && (
          <ul className="cast short-cast">
            {visibleCast.map(castMember => {
              const { id, profile_path, name } = castMember;
              // if series show the episodes
              let character;
              if (isMovie) {
                character = castMember.character;
              } else {
                character = castMember.roles
                  .map(role => `${role.character}(${role.episode_count})`)
                  .join(", ");
              }
              return (
                <li key={`${id}nemShowAllCast`}>
                  <Link to={`/person/${id}`}>
                    <img
                      src={profile_path ? getImgUrl("w185", profile_path) : no_image}
                      alt={name}
                    />
                    <span>{name}</span>
                    <p>{character}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        {showAll && (
          <>
            <h4>Cast</h4>
            <ul className="cast full-cast">
              {credits.cast.map((castMember, index) => {
                const { id, profile_path, name } = castMember;
                let character;
                if (isMovie) {
                  character = castMember.character;
                } else {
                  character = castMember.roles
                    .map(
                      role =>
                        `${role.character} (${role.episode_count} ${
                          role.episode_count > 1 ? "episides" : "episode"
                        })`
                    )
                    .join(", ");
                }
                return (
                  <li key={`${id}${index}cast`}>
                    <Link to={`/person/${id}`}>
                      <div className="img-wrapper">
                        <img
                          src={profile_path ? getImgUrl("w45", profile_path) : no_image}
                          alt={name}
                        />
                      </div>
                      <div className="text-wrapper">
                        <span>{name}</span>
                        <p>{character}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <h4>Crew</h4>
            <ul className="crew">
              {crewDepartments.map((crewDep, index) => (
                <li key={`${index}justIndexCrewDep`}>
                  <h5 className="department">{crewDep.name}</h5>
                  <ul className="crewMembers">
                    {crewDep.value.map((crewMember, index) => {
                      const { id, name } = crewMember;
                      let job;
                      if (isMovie) {
                        job = crewMember.job;
                      } else {
                        job = crewMember.jobs.map(job => job.job).join(", ");
                      }

                      return (
                        <li key={`${id}${index}`}>
                          <Link to={`/person/${id}`}>
                            <span>{name}</span>
                          </Link>
                          <p>{job}</p>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </StyledCredits>
  );
};

export default Credits;

const StyledCredits = styled.article`
  .head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .cast,
  .crew {
    display: grid;
    li {
      overflow: hidden;
    }
    a:hover span {
      color: var(--clr-primary);
    }
    span {
      display: block;
      font-weight: bold;
      color: var(--clr-font-light);
    }
  }

  .short-cast {
    grid-template-columns: repeat(3, minmax(4rem, 10rem));
    justify-content: space-evenly;
    grid-gap: 0.75rem;

    img {
      width: 100%;
      border-radius: 999rem;
      border: solid 1px var(--clr-secondary-medium);
    }
    span,
    p {
      text-align: center;
    }
  }

  .full-cast {
    grid-gap: 1rem;
    margin: 2rem 0 3rem;

    li {
      background: linear-gradient(to right, rgba(73, 79, 83, 1) 0%, rgba(73, 79, 83, 0) 100%);
      padding: 1rem;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    a {
      display: flex;
      .img-wrapper,
      .text-wrapper {
        flex: 1;
      }
    }
    .img-wrapper {
      max-width: 2.813rem;
      margin-right: 1rem;
    }
  }
  .crew {
    grid-gap: 1rem;
    margin-top: 2rem;
    .department {
      padding: 0.5rem;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      background: linear-gradient(to right, rgba(73, 79, 83, 1) 0%, rgba(73, 79, 83, 0) 100%);
    }
    .crewMembers {
      li {
        display: flex;
        margin: 0.5rem 0;

        span {
          margin-right: 1rem;
        }
      }
    }
  }

  @media screen and (min-width: 600px) {
    .full-cast {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (min-width: 800px) {
    .short-cast {
      grid-template-columns: repeat(5, minmax(2.5rem, 10rem));
      justify-items: center;
      grid-gap: 1rem;
    }
    .full-cast {
      grid-template-columns: repeat(3, 1fr);
    }
    .crew {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 2rem;
    }
  }
`;
