import React, { createContext, useContext, useEffect, useReducer } from "react";
import { discoverReducer as reducer } from "../reducers/discoverReducer";
import {
  SET_LOADING,
  SET_ERROR,
  GET_SHOWS,
  RESET_SHOWS,
  SET_SORTING,
  GET_GENRES,
  SET_GENRE_ERROR,
  SET_FILTERS,
  CLEAR_FILTERS,
} from "../actions";
import { getGenresUrl, getDiscoverShowsUrl } from "../utils/api";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: { show: false, msg: "" },
  filters: { ratings: "", released: "", runtime: "", genres: [] },
  sorting: "popularity.desc",
  shows: null,
  type: "",
  page: 1,
  isStarting: true,
  movieGenres: [],
  seriesGenres: [],
  genresError: false,
  totalPages: -1,
};
const DiscoverContext = createContext();

export const DiscoverProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //fetch the genres when the app starts
  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const movieGenresData = await axios.get(getGenresUrl("movie"));
      const seriesGenresData = await axios.get(getGenresUrl("tv"));

      dispatch({
        type: GET_GENRES,
        payload: {
          movieGenres: movieGenresData.data.genres,
          seriesGenres: seriesGenresData.data.genres,
        },
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: SET_GENRE_ERROR });
    }
  };

  const fetchShows = async (pageType, page = 1) => {
    dispatch({ type: SET_LOADING });
    try {
      const type = pageType === "series" ? "tv" : pageType;

      const { ratings, released, runtime, genres } = state.filters;
      let filtersString = "";

      //check the filter properties, if not empty add to the string
      if (ratings.length > 0) {
        filtersString += `&vote_average.gte=${ratings}`;
      }

      if (released.length > 0) {
        const base = pageType === "series" ? "&first_air_date" : "&primary_release_date";
        const releasedParts = released.split(",");
        if (releasedParts.length > 1) {
          filtersString += `${base}.gte=${releasedParts[0]}${base}.lte=${releasedParts[1]}`;
        } else if (releasedParts[0] === "2020-01-01") {
          filtersString += `${base}.gte=${releasedParts[0]}`;
        } else {
          filtersString += `${base}.lte=${releasedParts[0]}`;
        }
      }

      if (runtime.length > 0) {
        const base = "&with_runtime";
        const runtimeParts = runtime.split("-");
        if (runtimeParts.length > 1) {
          filtersString += `${base}.gte=${runtimeParts[0]}${base}.lte=${runtimeParts[1]}`;
        } else if (runtime[0] === "30") {
          filtersString += `${base}.lte=${runtimeParts[0]}`;
        } else {
          filtersString += `${base}.gte=${runtimeParts[0]}`;
        }
      }

      if (genres.length > 0) {
        filtersString += `&with_genres=${genres.join(",")}`;
      }

      const data = await axios.get(getDiscoverShowsUrl(type, state.sorting, filtersString, page));

      dispatch({ type: GET_SHOWS, payload: { data: data.data, pageType, page } });
    } catch (err) {
      console.log(err);
      dispatch({ type: SET_ERROR });
    }
  };

  //if the user changes the filter or the sorting fetch the data
  useEffect(() => {
    if (!state.isStarting) {
      fetchShows(state.type);
    }
  }, [state.filters, state.sorting]);

  const resetShows = () => {
    dispatch({ type: RESET_SHOWS });
  };

  const setSorting = newSorting => {
    dispatch({ type: SET_SORTING, payload: newSorting });
  };

  const setFilters = (key, value) => {
    dispatch({ type: SET_FILTERS, payload: { key, value } });
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <DiscoverContext.Provider
      value={{ ...state, fetchShows, setSorting, resetShows, setFilters, clearFilters }}
    >
      {children}
    </DiscoverContext.Provider>
  );
};

export const useDiscoverContext = () => useContext(DiscoverContext);
