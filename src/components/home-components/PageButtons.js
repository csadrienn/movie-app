import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useSearchContext } from "../../context/searchContext";

const PageButtons = () => {
  const { page, totalPages, setPage } = useSearchContext();
  const [visibleBtns, setVisibleBtns] = useState(null);

  useEffect(() => {
    const buttons = makeTotal();
    //set the actual visible buttons depending on the actual page and the total
    if (totalPages <= 6) {
      setVisibleBtns(buttons);
    } else {
      if (page > 0 && page < 4) {
        setVisibleBtns([
          ...buttons.slice(0, 4),
          <span key="span1">...</span>,
          buttons[totalPages - 1],
        ]);
      } else if (page === 4) {
        if (totalPages === 7) {
          setVisibleBtns([...buttons]);
        } else {
          setVisibleBtns([
            ...buttons.slice(0, 5),
            <span key="span1">...</span>,
            buttons[totalPages - 1],
          ]);
        }
      } else if (page > 4 && page < totalPages - 3) {
        setVisibleBtns([
          buttons[0],
          <span key="span1">...</span>,
          ...buttons.slice(page - 2, page + 1),
          <span key="span2">...</span>,
          buttons[totalPages - 1],
        ]);
      } else if (page > 4 && page < totalPages - 2) {
        setVisibleBtns([
          buttons[0],
          <span key="span1">...</span>,
          ...buttons.slice(totalPages - 5, totalPages),
        ]);
      } else {
        setVisibleBtns([
          buttons[0],
          <span key="span1">...</span>,
          ...buttons.slice(totalPages - 4, totalPages),
        ]);
      }
    }
  }, [page, totalPages]);

  //create an array of buttons with the page numbers
  const makeTotal = () => {
    const buttons = Array.from({ length: totalPages }, (_, index) => {
      const currPage = index + 1;
      return (
        <button
          className={page === currPage ? `btn page-btn active` : `btn page-btn`}
          key={index}
          onClick={() => {
            setPage(currPage);
            window.scrollTo(0, 0);
          }}
        >
          {currPage}
        </button>
      );
    });
    return buttons;
  };

  return (
    <StyledPageButtons>
      <button
        type="button"
        className="prev-btn btn icon-btn"
        disabled={page === 1}
        onClick={() => {
          window.scrollTo(0, 0);
          setPage(page - 1);
        }}
      >
        <FaAngleLeft className="icon" />
      </button>
      {visibleBtns &&
        visibleBtns.map(item => {
          return item;
        })}
      <button
        type="button"
        className="next-btn btn icon-btn"
        disabled={page === totalPages}
        onClick={() => {
          window.scrollTo(0, 0);
          setPage(page + 1);
        }}
      >
        <FaAngleRight className="icon" />
      </button>
    </StyledPageButtons>
  );
};

export default PageButtons;

const StyledPageButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  flex-wrap: wrap;

  .page-btn {
    margin: 0 0.375rem;
    padding: 0.5rem 0.25rem;
    box-shadow: none;
    background: transparent;
    position: relative;
    font-weight: normal;
    color: var(--clr-font-medium);

    &::before,
    &::after {
      content: "";
      width: 100%;
      height: 2px;
      position: absolute;
      left: 0;
      bottom: 2px;
      background: var(--clr-font-medium);
    }

    &::after {
      background: var(--clr-primary);
      transform: translateY(300%);
      opacity: 0;
      transition: none;
    }

    &:hover {
      &::after {
        transform: translateY(0);
        transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
        opacity: 1;
      }
      &::before {
        opacity: 0;
      }
    }

    &.active,
    &:focus {
      color: var(--clr-primary);
      outline: none;

      &::after {
        transform: translateY(0);
        opacity: 1;
      }
      &::before {
        opacity: 0;
      }
    }
  }

  span {
    color: var(--clr-font-medium);
    margin: 0 0.375rem;
  }

  .prev-btn {
    margin-right: 0.375rem;
  }

  .next-btn {
    margin-left: 0.375rem;
  }

  .next-btn:disabled,
  .prev-btn:disabled,
  .next-btn:disabled:hover,
  .prev-btn:disabled:hover {
    background: var(--clr-secondary-medium);
    color: var(--clr-font-medium);
    pointer-events: none;
  }

  .icon {
    font-size: 0.75rem;
  }

  @media screen and (min-width: 800px) {
    .page-btn,
    span {
      margin: 0 0.5rem;
    }
    .prev-btn {
      margin-right: 0.5rem;
    }

    .next-btn {
      margin-left: 0.5rem;
    }
  }
`;
