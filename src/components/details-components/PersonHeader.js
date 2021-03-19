import React, { useState } from "react";
import styled from "styled-components";
import { formDate, makeExternalLinkList } from "../../utils/utils";
import { getImgUrl } from "../../utils/api";
import { useDetailsContext } from "../../context/detailsContext";

const PersonHeader = () => {
  const { personDetails } = useDetailsContext();
  const {
    biography,
    birthday,
    deathday,
    known_for_department,
    name,
    place_of_birth,
    profile_path,
    homepage,
    external_ids,
  } = personDetails;

  const [isFullBio, setIsFullBio] = useState(biography.length < 150);
  const shortBio = biography.length > 150 ? `${biography.slice(0, 150)}...` : biography;
  const links = makeExternalLinkList(homepage, external_ids);

  return (
    <StyledHeader className="dark-section">
      {profile_path && (
        <div className="profile-wrapper">
          <img src={getImgUrl("h632", profile_path)} alt={name} />
        </div>
      )}
      <div className="info-wrapper">
        <h1 className="name">{name}</h1>
        <h2 className="italic-heading">{known_for_department}</h2>
        <div className="base-info">
          {birthday && (
            <p>
              <span>Born: </span>
              {formDate(birthday)}
            </p>
          )}
          {place_of_birth && (
            <p>
              <span>Place of birth: </span>
              {place_of_birth}
            </p>
          )}
          {deathday && (
            <p>
              <span>Died: </span>
              {formDate(deathday)}
            </p>
          )}
          <ul className="links">
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
            })}
          </ul>
        </div>
      </div>

      {biography ? (
        <p className="bio">
          {isFullBio ? biography : shortBio}
          {biography.length > shortBio.length && (
            <button type="button" className="btn text-btn" onClick={() => setIsFullBio(!isFullBio)}>
              {isFullBio ? "less" : "read more"}
            </button>
          )}
        </p>
      ) : (
        <p className="bio">Sorry, there is no biography for this person.</p>
      )}
    </StyledHeader>
  );
};

export default PersonHeader;

const StyledHeader = styled.header`
  display: grid;

  .profile-wrapper {
    max-width: 70%;
    margin: 0.5rem auto;

    img {
      width: 100%;
      border-radius: var(--border-radius);
      border: solid 1px var(--clr-secondary-medium);
    }
  }

  .bio {
    text-align: justify;
    margin: 0.75rem 0 1rem;
  }

  .name,
  .italic-heading {
    text-align: center;
  }

  .base-info {
    p,
    ul {
      margin-bottom: 0.5rem;
    }
  }
  span {
    font-weight: bold;
    margin-right: 0.25rem;
  }
  .links {
    display: flex;
    li {
      margin-right: 0.5rem;
    }
    li:last-child {
      margin-right: 0;
    }
    a {
      color: var(--clr-font-medium);
      &:hover {
        color: var(--clr-primary);
      }
    }
    .icon {
      font-size: 1.25rem;
    }
  }

  @media screen and (min-width: 500px) {
    grid-template-columns: 2fr 3fr;
    grid-gap: 1rem;
    padding: 1.5rem;

    .name,
    .italic-heading {
      text-align: start;
    }
    .profile-wrapper {
      max-width: 100%;
      margin: 0;
    }
    .bio {
      grid-column: span 2;
      margin: 0;
    }
  }

  @media screen and (min-width: 700px) {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto 1fr;
    grid-gap: 1rem;
    .profile-wrapper {
      grid-row: span 2;
      max-width: 18rem;
    }
    .bio {
      grid-column: 2;
      margin-right: 3rem;
    }
  }

  @media screen and (min-width: 800px) {
    column-gap: 2rem;
    grid-template-columns: minmax(10rem, 18rem) 3fr;
  }
`;
