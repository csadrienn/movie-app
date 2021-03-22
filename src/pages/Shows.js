import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { LgScreenFilters, SmScreenFilters } from "../components/shows-components";
import { Loading, Error, GridCards, InfinityScroll } from "../components/general-components";
import { useDiscoverContext } from "../context/discoverContext";
import { useViewport } from "../utils/viewport";

const Shows = () => {
  const { width } = useViewport();
  const location = useLocation();
  const pageType = location.pathname.includes("movie") ? "movie" : "series";

  const {
    isLoading,
    error,
    shows,
    type,
    fetchShows,
    resetShows,
    page,
    totalPages,
    isStarting,
  } = useDiscoverContext();

  useEffect(() => {
    return () => {
      resetShows();
    };
  }, [location]);

  useEffect(() => {
    if (isStarting) {
      fetchShows(pageType);
    }
  }, [isStarting]);

  const isMore = totalPages !== -1 && totalPages !== page;
  const fetchPages = () => {
    fetchShows(pageType, page + 1);
  };

  return (
    <StyledShows>
      <div className="content">
        {width < 800 ? <SmScreenFilters type={pageType} /> : <LgScreenFilters type={pageType} />}

        <div className="results">
          {type === pageType && (
            <GridCards showList={shows}>
              <InfinityScroll loading={isLoading} isMore={isMore} fetch={fetchPages} />
            </GridCards>
          )}
          {totalPages === -1 && isLoading && <Loading />}
          {error.show && (
            <div className="centered-content">
              <Error msg={error.msg} />
            </div>
          )}
        </div>
      </div>
    </StyledShows>
  );
};

export default Shows;

const StyledShows = styled.main`
  .centered-content {
    min-height: 95vh;
  }
  .content {
    padding: 0;
  }

  .results {
    width: 100%;
  }
  .more-btn {
    width: 100%;
  }

  @media screen and (min-width: 800px) {
    .content {
      display: flex;
    }
    .results {
      padding-left: 3rem;
      background: linear-gradient(to right, var(--clr-secondary) 0%, var(--clr-bcg) 100%);
    }
    .grid-cards {
      margin: 3rem 0 3rem;
    }
  }
`;
