import React from "react";

import { Searchbar, Highlights, SearchResults } from "../components/home-components";
import { useSearchContext } from "../context/searchContext";

const Home = () => {
  const { query } = useSearchContext();

  return (
    <main>
      <Searchbar />
      {query.length > 0 && <SearchResults />}
      <Highlights />
    </main>
  );
};

export default Home;
