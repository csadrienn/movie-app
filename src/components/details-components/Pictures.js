import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getImgUrl } from "../../utils/api";
import Modal from "./Modal";
import { Carousel } from "../general-components";

const Pictures = ({ imgPaths, name }) => {
  const [showAll, setshowAll] = useState(false);
  const [isExpandedPic, setIsExpandedPic] = useState(false);
  const [picIndex, setPicIndex] = useState(0);
  const visibleImgs = imgPaths.slice(0, 7);

  const expandPicture = index => {
    setPicIndex(index);
    setIsExpandedPic(true);
  };

  const closeModal = () => {
    setIsExpandedPic(false);
  };

  const gridElement = (
    <div className="grid-container">
      {imgPaths.map((pic, index) => (
        <button
          className={
            pic.orientation === "portrait"
              ? "img-wrapper btn text-btn"
              : "img-wrapper btn text-btn landscape"
          }
          key={index}
          onClick={() => expandPicture(index)}
        >
          <img
            src={getImgUrl(pic.orientation === "portrait" ? "w185" : "w300", pic.path)}
            alt={name}
          />
        </button>
      ))}
    </div>
  );
  const noImg = <p>Sorry, there are no images.</p>;
  const scrollElement = (
    <div className="scroll-container">
      {visibleImgs.map((pic, index) => (
        <button
          className={
            pic.orientation === "portrait"
              ? "img-wrapper btn text-btn"
              : "img-wrapper btn text-btn landscape"
          }
          key={index}
          onClick={() => expandPicture(index)}
        >
          <img
            src={getImgUrl(pic.orientation === "portrait" ? "w185" : "w300", pic.path)}
            alt={name}
          />
        </button>
      ))}
    </div>
  );

  let content = scrollElement;
  if (showAll) {
    content = gridElement;
  }
  if (imgPaths.length === 0) {
    content = noImg;
  }

  return (
    <StyledPictures>
      <div className="heading">
        <h3>Images</h3>
        {imgPaths.length > visibleImgs.length && (
          <button type="button" className={"btn text-btn"} onClick={() => setshowAll(!showAll)}>
            {showAll ? "Show less" : "Show all"}
          </button>
        )}
      </div>
      <div className="dark-section">{content}</div>
      {isExpandedPic && (
        <Modal imgPaths={imgPaths} closeModal={closeModal}>
          <Carousel columns={imgPaths.length + 1} index={picIndex}>
            {[...imgPaths, imgPaths[0]].map((pic, index) => (
              <div className="wrapper" key={index}>
                <div className={`${pic.orientation} img-wrapper`} key={index}>
                  <img
                    src={getImgUrl(pic.orientation === "portrait" ? "h632" : "w780", pic.path)}
                    alt={name}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </Modal>
      )}
    </StyledPictures>
  );
};

export default Pictures;

const StyledPictures = styled.article`
  margin-top: 2rem;

  .heading {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    button {
      height: max-content;
    }
  }
  .grid-container {
    display: grid;
    justify-items: center;
    justify-content: center;
    align-items: end;
    grid-gap: 0.75rem;
    grid-template-columns: repeat(auto-fit, minmax(8.5rem, 1fr));
  }

  .dark-section {
    .img-wrapper {
      max-width: 11rem;
      min-width: 8.5rem;
      margin: 0;
      &.landscape {
        max-width: 18.75rem;
      }
    }
  }
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .portrait {
      height: 80vh;
      max-height: 80vh;
      max-width: 100%;
      img {
        height: 100%;
        width: auto;
      }
    }
    .landscape {
      height: fit-content;
      max-height: 100%;
      width: 80%;
      max-width: 780px;
      img {
        width: 100%;
        height: auto;
      }
    }
  }

  .scroll-container {
    display: grid;
    justify-content: center;
    grid-auto-flow: column;
    overflow-x: auto;
    grid-gap: 0.75rem;
    padding-bottom: 0.5rem;
  }
  .scroll-container::-webkit-scrollbar {
    height: 0.5rem;
  }
  .scroll-container::-webkit-scrollbar-track {
    background: var(--clr-secondary-trans);
    border-radius: 20px;
  }

  @media screen and (min-width: 600px) {
    .dark-section,
    .scroll-container {
      grid-gap: 1.25rem;
    }
  }
`;
