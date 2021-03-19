import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import no_image185 from "../../assets/no_image185.svg";
import { getImgUrl } from "../../utils/api";

const Show = ({ cardItem }) => {
  const { id, heading, imgPath, year, rating, department, url } = cardItem;

  return (
    <StyledCard className="card">
      <Link to={`${url}${id}`}>
        <div className="img-wrapper">
          <img src={imgPath ? getImgUrl("w185", imgPath) : no_image185} alt={heading} />

          {year && <p>{year}</p>}
          {rating > 0 && (
            <div className="rate">
              <FaStar className="icon star-icon" />
              <span className="vote">{rating}</span>
            </div>
          )}
        </div>

        <h4>{heading}</h4>
        {department && <p className="person-info">{department}</p>}
      </Link>
    </StyledCard>
  );
};

export default Show;

const StyledCard = styled.section`
  overflow: hidden;
  transition: transform 0.3s ease;
  max-width: 11rem;
  border-radius: var(--border-radius);

  &:hover {
    transform: scale(1.05);
  }

  .img-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 240px;
    img {
      min-height: 100%;
      width: auto;
    }

    .rate,
    p {
      position: absolute;
      bottom: 0;
      color: var(--clr-font-light);
      font-size: 0.875rem;
      background: rgba(0, 0, 0, 0.6);
      padding: 0.188rem 0.313rem;
    }

    p {
      left: 0;
      border-top-right-radius: 5px;
    }

    .rate {
      right: 0;
      border-top-left-radius: 5px;
    }

    .star-icon {
      margin-right: 0.313rem;
      font-size: 0.875rem;
    }
  }

  h4 {
    font-size: 1rem;
    margin: 0.5rem 0.75rem 0.25rem;
    text-align: center;
    font-weight: normal;
  }

  .person-info {
    text-align: center;
    font-size: 0.75rem;
  }
`;
