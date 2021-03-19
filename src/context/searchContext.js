import React, { createContext, useContext, useEffect, useReducer } from "react";
import { searchRecuder as reducer } from "../reducers/searchReducer";
import {
  TOGGLE_ERROR,
  SET_SEARCH_QUERY,
  SET_CATEGORY,
  SET_PAGE,
  GET_SEARCH_RESULTS,
  CLEAR_SEARCH,
} from "../actions";
import { getSearchUrl } from "../utils/api";
import axios from "axios";

const initialState = {
  isLoading: true,
  error: { show: false, msg: "" },
  category: "multi",
  query: "",
  page: 1,
  totalPages: 0,
  searchResults: [],
  isStarting: true,
};

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setQuery = text => {
    dispatch({ type: SET_SEARCH_QUERY, payload: text });
  };

  const setCategory = category => {
    dispatch({ type: SET_CATEGORY, payload: category });
  };

  const fetchResults = async () => {
    dispatch({ type: TOGGLE_ERROR, payload: { show: false, msg: "" } });
    try {
      const data = await axios.get(getSearchUrl(state.query, state.category, state.page));
      dispatch({ type: GET_SEARCH_RESULTS, payload: data.data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: TOGGLE_ERROR,
        payload: { show: true, msg: "There is something wrong..." },
      });
    }
  };

  const clearSearch = () => {
    dispatch({ type: CLEAR_SEARCH });
  };

  const setPage = page => {
    dispatch({ type: SET_PAGE, payload: page });
  };

  useEffect(() => {
    if (state.query.length > 0) {
      fetchResults();
    }
  }, [state.query, state.category, state.page]);

  return (
    <SearchContext.Provider value={{ ...state, setQuery, setCategory, setPage, clearSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
