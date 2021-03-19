import React from "react";
import styled from "styled-components";
import { makeCardItem } from "../../utils/utils";
import { Card } from "../general-components";

const ScrollSection = ({ heading, results, total, type, msg }) => {
  let showList = results.slice(0, 7);
  if (type !== "person") {
    showList = showList.map(res => {
      return { ...res, media_type: type === "series" ? "tv" : type };
    });
  }

  if (total === 0) {
    return (
      <StyledScrollSection>
        <h3>{heading}</h3>
        <div className="dark-section">
          <p className="no-result">{msg}</p>
        </div>
      </StyledScrollSection>
    );
  }

  return (
    <StyledScrollSection>
      <h3>{heading}</h3>
      <div className="dark-section ">
        <div className="scroll-container">
          {showList.map(show => {
            let cardItem = makeCardItem(show);
            return <Card key={cardItem.id} cardItem={cardItem} />;
          })}
        </div>
      </div>
    </StyledScrollSection>
  );
};

export default ScrollSection;

const StyledScrollSection = styled.article`
  margin-top: 2rem;

  .scroll-container {
    display: grid;
    justify-content: start;
    grid-auto-flow: column;
    overflow-x: auto;
    .card {
      width: 11rem;
      margin: 1rem;
    }
  }
  .scroll-container::-webkit-scrollbar {
    height: 0.5rem;
  }
  .scroll-container::-webkit-scrollbar-track {
    background: var(--clr-secondary-trans);
    border-radius: 20px;
  }

  .no-result {
    width: 100%;
    text-align: center;
  }
`;
