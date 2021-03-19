import React, { Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Loading, Error } from "../general-components";
import SliderCards from "./SliderCards";
import { FiChevronRight } from "react-icons/fi";
import { useHighlightsContext } from "../../context/highlightsContext";
import { useDiscoverContext } from "../../context/discoverContext";

const Highlights = () => {
  const { setSorting } = useDiscoverContext();

  const {
    isLoading,
    error,
    trending,
    popularMovies,
    popularSeries,
    topRatedMovies,
    topRatedSeries,
  } = useHighlightsContext();

  if (isLoading) {
    return (
      <StyledHighlights className="centered-content">
        <Loading />
      </StyledHighlights>
    );
  }

  if (error.show) {
    return (
      <StyledHighlights className="centered-content">
        <Error msg={error.msg} />
      </StyledHighlights>
    );
  }

  const trendingList = trending.slice(0, 12);
  const highlightList = [
    {
      name: "Popular movies",
      category: "movie",
      url: "movies",
      value: popularMovies.slice(0, 12).map(movie => {
        return { ...movie, media_type: "movie" };
      }),
      sort: "popularity.desc",
    },
    {
      name: "Popular series",
      category: "tv",
      url: "series",
      value: popularSeries.slice(0, 12).map(series => {
        return { ...series, media_type: "tv" };
      }),
      sort: "popularity.desc",
    },
    {
      name: "Top rated movies",
      category: "movie",
      url: "movies",
      value: topRatedMovies.slice(0, 12).map(movie => {
        return { ...movie, media_type: "movie" };
      }),
      sort: "vote_average.desc",
    },
    {
      name: "Top rated series",
      category: "tv",
      url: "series",
      value: topRatedSeries.slice(0, 12).map(series => {
        return { ...series, media_type: "tv" };
      }),
      sort: "vote_average.desc",
    },
  ];

  return (
    <StyledHighlights className="section">
      <div className="content">
        <h2 className="trending">Trending on this week</h2>
        <SliderCards showList={trendingList} />
        {highlightList.map((highlight, index) => {
          const { name, category, url, value, sort } = highlight;
          return (
            <Fragment key={index}>
              <Link to={`/${url}`} className="popular-link" onClick={() => setSorting(sort)}>
                <div className="icons-wrapper">
                  <h2>{name}</h2>
                  <FiChevronRight className="icon first-i" />
                  <FiChevronRight className="icon second-i" />
                </div>
                <span>show more</span>
              </Link>
              <SliderCards showList={value} />
            </Fragment>
          );
        })}
      </div>
    </StyledHighlights>
  );
};

export default Highlights;

const StyledHighlights = styled.section`
  .trending {
    margin-bottom: 1.5rem;
  }
  .popular-link {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    span {
      display: none;
    }

    .icon {
      display: none;
    }

    .icons-wrapper {
      position: relative;
    }

    &:hover {
      h2 {
        color: var(--clr-primary);
      }
    }
  }

  h2 {
    color: var(--clr-font-light);
    margin: 0;
    font-weight: normal;
  }

  @media screen and (min-width: 600px) {
    .popular-link {
      span {
        display: inline-block;
        color: var(--clr-primary);
        text-transform: capitalize;
        font-size: 1.125rem;
        opacity: 0;
        transition: opacity 0.2s ease-out;
      }

      .icon {
        display: block;
        position: absolute;
        top: 50%;
        right: -2rem;
        transform: translateY(-50%);
        font-size: 3rem;
        stroke-width: 0.125rem;
        color: var(--clr-font-light);
        opacity: 0;
        transition: transform 0.2s ease-out, opacity 0.2s ease-out;

        &.first-i {
          transition-delay: 0s;
        }
        &.second-i {
          right: -3rem;
          transition-delay: 0.05s;
        }
      }

      &:hover {
        span {
          opacity: 1;
        }
        .icon {
          opacity: 1;
          transform: translate(90%, -50%);
          color: var(--clr-primary);

          &.first-i {
            transition-delay: 0.05s;
          }
          &.second-i {
            transition-delay: 0s;
          }
        }
      }
    }
  }

  @media screen and (min-width: 1200px) {
    /* .content {
      max-width: 1500px;
      margin: 0 auto 4rem;
    } */
  }
`;
