import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { formDate } from "../../utils/utils";
import { useDetailsContext } from "../../context/detailsContext";
import { InfinityScroll } from "../general-components";

const Reviews = ({ id }) => {
  const {
    reviews,
    type,
    fetchReviews,
    reviewLoading,
    isMoreReview,
    reviewPage,
    totalReviews,
  } = useDetailsContext();
  //initially hide the total review if its longer than 250 char
  const reviewList = reviews.map(review => {
    return { ...review, isTotalContent: review.content.length > 250 ? false : true };
  });
  const [showAll, setshowAll] = useState(false);
  //initially show only one review
  const [visibleReviews, setVisibleReviews] = useState(reviewList.slice(0, 1));

  //toggle between one and all reviews
  useEffect(() => {
    setVisibleReviews(() => {
      const newVisibleReviews = showAll ? [...reviewList] : reviewList.slice(0, 1);
      return newVisibleReviews;
    });
  }, [showAll, reviews]);

  //show or hide the full review
  const toggleFullContent = reviewId => {
    const changedReview = visibleReviews.map(review => {
      if (reviewId === review.id) {
        return { ...review, isTotalContent: !review.isTotalContent };
      }
      return review;
    });
    setVisibleReviews(changedReview);
  };

  //fetch the next page
  const handleReviewFetch = () => {
    fetchReviews(id, reviewPage + 1);
  };

  return (
    <StyledReviews>
      <div className="head">
        <h3>Reviews</h3>
        {totalReviews > 1 && (
          <button type="button" className={"btn text-btn"} onClick={() => setshowAll(!showAll)}>
            {showAll ? "Show less" : "Show all"}
          </button>
        )}
      </div>
      <section className="dark-section">
        {totalReviews > 0 ? (
          <>
            <ul className="reviews">
              {visibleReviews.map(review => {
                const { content, created_at, id, author_details, author, isTotalContent } = review;
                const shortContent = `${content.slice(0, 250)}...`;
                return (
                  <li key={id} className={showAll ? "bordered" : null}>
                    {author_details.rating && (
                      <div className="rating">
                        <FaStar className="icon star-icon" />
                        <p>{author_details.rating}/10</p>
                      </div>
                    )}
                    <p className="review-content">
                      {isTotalContent ? content : shortContent}
                      {content.length > shortContent.length - 3 && (
                        <button
                          type="button"
                          className="btn text-btn"
                          onClick={() => toggleFullContent(id)}
                        >
                          {isTotalContent ? "less" : "read more"}
                        </button>
                      )}
                    </p>
                    <p className="review-meta">
                      {author}, {formDate(created_at)}
                    </p>
                  </li>
                );
              })}
            </ul>
            {showAll && (
              <InfinityScroll
                loading={reviewLoading}
                isMore={isMoreReview}
                fetch={handleReviewFetch}
              />
            )}
          </>
        ) : (
          <p className="no-review-info">No reviews for this {type} yet.</p>
        )}
      </section>
    </StyledReviews>
  );
};

export default Reviews;

const StyledReviews = styled.article`
  margin-top: 3rem;

  .head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .rating {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    color: var(--clr-font-light);
    margin-bottom: 1rem;
    .star-icon {
      font-size: 1.25rem;
    }
  }

  .review-meta {
    color: var(--clr-font-light);
    margin-top: 0.5rem;
  }
  .bordered {
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid var(--clr-bcg);
  }
  .no-review-info {
    text-align: center;
  }
`;
