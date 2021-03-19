import React from "react";
import { GridCards, Loading } from "../general-components";
import PageButtons from "./PageButtons";
import { useSearchContext } from "../../context/searchContext";
import styled from "styled-components";

const SearchResults = () => {
  const { error, isLoading, searchResults, isStarting } = useSearchContext();

  if (isStarting && isLoading) {
    return (
      <section className="section">
        <Loading />
      </section>
    );
  }
  if (isStarting && error.show) {
    return (
      <section className="section">
        {error.show && <p style={{ textAlign: "center" }}>{error.msg}</p>}
      </section>
    );
  }

  return (
    <StyledSearchResults className="content">
      {error.show && <p style={{ textAlign: "center" }}>{error.msg}</p>}
      {searchResults.length === 0 && (
        <p style={{ textAlign: "center" }}>There is no result, please search for something else.</p>
      )}

      <GridCards showList={searchResults} />
      {searchResults.length > 0 && <PageButtons />}
    </StyledSearchResults>
  );
};

export default SearchResults;

const StyledSearchResults = styled.section`
  @media screen and (min-width: 1200px) {
    /* .content {
      margin: 0 auto 0;
      max-width: 1400px;
    } */
  }
`;
