import React, { useEffect } from "react";
import styled from "styled-components";
import { Loading, Error } from "../components/general-components";
import {
  ShowHeader,
  Credits,
  Pictures,
  ShowDetails,
  Reviews,
  ScrollSection,
  Seasons,
} from "../components/details-components";
import { useLocation } from "react-router-dom";
import { useDetailsContext } from "../context/detailsContext";

const SingleShow = () => {
  const { fetchShowDetails, showDetails, isShowLoading, showError, type } = useDetailsContext();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const pageType = location.pathname.split("/")[1];

  useEffect(() => {
    fetchShowDetails(id, pageType);
  }, [location]);

  if (isShowLoading || type !== pageType) {
    return (
      <StyledSingleShow className="centered-content">
        <Loading />
      </StyledSingleShow>
    );
  }

  if (showError.show) {
    return (
      <StyledSingleShow className="centered-content">
        <Error msg={showError.msg} />
      </StyledSingleShow>
    );
  }

  const imgs = showDetails.images.posters
    .map(pic => {
      return { path: pic.file_path, orientation: "portrait" };
    })
    .concat(
      showDetails.images.backdrops.map(pic => {
        return { path: pic.file_path, orientation: "landscape" };
      })
    );

  const recommendations = showDetails.recommendations.results;

  return (
    <StyledSingleShow>
      <ShowHeader />
      <div className="content">
        <Credits />
        {type === "series" && <Seasons />}
        <ScrollSection
          heading="You may also like"
          results={recommendations}
          total={showDetails.recommendations.total_results}
          type={type}
          msg={`No recommendations for this ${type}.`}
        />
        <Pictures imgPaths={imgs} name={showDetails.title || showDetails.name} />
        <ShowDetails />
        <Reviews id={id} />
      </div>
    </StyledSingleShow>
  );
};

export default SingleShow;

const StyledSingleShow = styled.main`
  .content {
    .dark-section {
      margin-bottom: 2rem;
    }
  }
`;
