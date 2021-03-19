import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, Carousel } from "../general-components";
import { makeCardItem, splitArray } from "../../utils/utils";
import { useViewport } from "../../utils/viewport";

const cardAmount = 12;
const getCardPerSlider = width => {
  if (width <= 450) {
    return 1;
  }

  if (width <= 650) {
    return 2;
  }
  if (width <= 900) {
    return 3;
  }
  if (width <= 1250) {
    return 4;
  }
  return 6;
};

const SliderCards = ({ showList }) => {
  const { width } = useViewport();
  const [cardsPerSlider, setCardsPerSlider] = useState(() => getCardPerSlider(width));

  useEffect(() => {
    setCardsPerSlider(() => getCardPerSlider(width));
  }, [width]);

  const splitCardArray = splitArray([...showList.slice(0, cardAmount)], cardsPerSlider);
  splitCardArray.push(splitCardArray[0]);

  return (
    <StyledSliderCards>
      <div className="slider-container dark-section">
        <Carousel columns={splitCardArray.length} index={0}>
          {splitCardArray.map((resultsChunk, index) => {
            return (
              <div className="visible-cards" key={index}>
                {resultsChunk.map(result => {
                  let cardItem = makeCardItem(result);
                  return <Card key={cardItem.id} cardItem={cardItem} />;
                })}
              </div>
            );
          })}
        </Carousel>
      </div>
    </StyledSliderCards>
  );
};

export default SliderCards;

const StyledSliderCards = styled.article`
  margin-bottom: 4rem;
  .slider-container {
    padding: 0;
  }

  .scroll-container {
    display: grid;
    justify-content: start;
    grid-auto-flow: column;
    overflow-x: scroll;
    .card {
      width: 11rem;
    }
  }

  .visible-cards {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
    padding: 0.75rem 1rem 0.75rem;
    margin: 1rem 0;
  }

  .card {
    flex: 1;
    margin: 0 0.5rem;
    a {
      color: var(--clr-font-light);
    }
    .img-wrapper {
      border: none;
      box-shadow: none;

      height: 260px;
      display: flex;
      align-items: flex-end;
      img {
        width: 100%;
        min-height: auto;
        border-radius: var(--border-radius);
      }
    }
  }
`;
