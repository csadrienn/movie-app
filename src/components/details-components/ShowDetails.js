import React from "react";
import styled from "styled-components";
import { useDetailsContext } from "../../context/detailsContext";
import { formatPrice, formDate } from "../../utils/utils";

const ShowDetails = () => {
  const { showDetails, type } = useDetailsContext();
  const isMovie = type === "movie";

  //get the string format of the original language
  const originalLanguage = showDetails.spoken_languages
    .filter(lang => lang.iso_639_1 === showDetails.original_language)
    .map(lang => lang.english_name);

  //create a list of details, the content depends of the show's type
  const detailList = [
    { name: "Status", value: showDetails.status },
    {
      name: "Release date",
      value: isMovie ? formDate(showDetails.release_date) : formDate(showDetails.first_air_date),
    },
    { name: "Original Language", value: originalLanguage[0] },
    {
      name: "Original Title",
      value: isMovie ? showDetails.original_title : showDetails.original_name,
    },
    {
      name: "Companies",
      value: showDetails.production_companies.map(company => company.name).join(", "),
    },
  ];
  if (isMovie) {
    detailList.splice(
      1,
      0,
      { name: "Budget", value: showDetails.budget > 0 ? formatPrice(showDetails.budget) : "-" },
      { name: "Revenue", value: showDetails.revenue > 0 ? formatPrice(showDetails.revenue) : "-" }
    );
  } else {
    detailList.push({
      name: "Networks",
      value: showDetails.networks.map(network => network.name).join(", "),
    });
  }

  return (
    <StyledDetails>
      <h3>Details</h3>
      <ul>
        {detailList.map((detail, index) => (
          <li key={index}>
            <span>{detail.name}:</span>
            <p>{detail.value.length > 0 ? detail.value : "-"}</p>
          </li>
        ))}
      </ul>
    </StyledDetails>
  );
};

export default ShowDetails;

const StyledDetails = styled.article`
  margin-top: 3rem;
  ul {
    display: grid;
    li {
      margin: 1rem 0;
      padding: 1rem;
      display: flex;
      background: linear-gradient(to right, rgba(18, 20, 21, 1) 0%, rgba(18, 20, 21, 0) 100%);
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }
  }
  span {
    font-weight: bold;
    margin-right: 0.5rem;
  }

  @media screen and (min-width: 800px) {
    ul {
      grid-template-columns: 1fr 1fr;
    }
  }
`;
