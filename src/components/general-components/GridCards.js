import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { makeCardItem } from "../../utils/utils";

const GridCards = ({ showList, children }) => {
  if (showList.length === 0) {
    return (
      <StyledGridCards className="no-result">
        <p>There are no results...</p>
      </StyledGridCards>
    );
  }

  return (
    <StyledGridCards className="grid-cards">
      {showList.map((result, index) => {
        let cardItem = makeCardItem(result);
        return <Card key={index} cardItem={cardItem} />;
      })}
      {children}
    </StyledGridCards>
  );
};

export default GridCards;

const StyledGridCards = styled.article`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9.25rem, 1fr));
  gap: 1.25rem;
  justify-items: center;
  justify-content: center;
  height: fit-content;
  &.no-result {
    display: block;
    p {
      margin: 3rem auto;
      text-align: center;
    }
  }
  .card {
    width: 100%;
  }

  @media screen and (min-width: 550px) {
    grid-template-columns: repeat(auto-fill, minmax(9.625rem, 1fr));
  }
`;
