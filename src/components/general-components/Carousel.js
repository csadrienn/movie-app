import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const transition = "transform 0.7s ease";

const Carousel = ({ columns, index, children }) => {
  const [sliderIndex, setSliderIndex] = useState(index);
  const [sliderTransition, setSliderTransition] = useState(transition);
  const [sliderEnd, setSliderEnd] = useState(false);

  const handleCaretClick = dir => {
    if (dir === "prev") {
      if (sliderIndex === 0) {
        setSliderTransition("none");
        setSliderIndex(columns - 1);
        setSliderEnd(true);
      } else {
        setSliderTransition(transition);
        setSliderIndex(sliderIndex - 1);
      }
    }
    if (dir === "next") {
      if (sliderIndex === columns - 1) {
        setSliderTransition("none");
        setSliderIndex(0);
        setSliderEnd(true);
      } else {
        setSliderTransition(transition);
        setSliderIndex(sliderIndex + 1);
      }
    }
  };

  //if reached one end jump to the opposite one
  useEffect(() => {
    if (sliderEnd) {
      setSliderTransition(transition);
      setSliderIndex(() => {
        let newIndex = sliderIndex === 0 ? 1 : columns - 2;
        return newIndex;
      });
      setSliderEnd(false);
    }
  }, [sliderIndex]);

  const translate = (-100 / columns) * sliderIndex;

  return (
    <StyledCarousel cols={columns}>
      <button
        type="button"
        className="prev-btn caret-btn"
        onClick={() => handleCaretClick("prev")}
        disabled={sliderEnd}
      >
        <FiChevronLeft className="icon" />
      </button>
      <div
        className="slider"
        style={{ transform: `translateX(${translate}%)`, transition: sliderTransition }}
      >
        {children}
      </div>
      <button
        type="button"
        className="next-btn caret-btn"
        onClick={() => handleCaretClick("next")}
        disabled={sliderEnd}
      >
        <FiChevronRight className="icon" />
      </button>
    </StyledCarousel>
  );
};

export default Carousel;

const StyledCarousel = styled.section`
  width: 100%;
  max-width: 100vw;
  height: 100%;
  overflow: hidden;
  position: relative;

  &:hover {
    .caret-btn {
      opacity: 1;
    }
  }

  .slider {
    display: grid;
    grid-template-columns: ${props => `repeat(${props.cols}, 1fr)`};
    width: ${props => `${props.cols * 100}%`};
    grid-auto-flow: column;
    height: 100%;
  }

  .caret-btn {
    position: absolute;
    top: 0;
    box-shadow: none;
    z-index: 10;
    width: 3rem;
    background: rgba(0, 0, 0, 0.6);
    border: none;
    min-height: 100%;
    outline: none;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;

    .icon {
      color: var(--clr-font);
      font-size: 2rem;
    }
  }
  .prev-btn {
    left: 0;
  }
  .next-btn {
    right: 0;
  }
`;
