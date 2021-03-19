import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { highlightsReducer as reducer } from "../reducers/highlightsReducer";
import { getPopularUrl, getTrendingUrl, getTopRatedUrl } from "../utils/api";
import { GET_HIGHLIGHTS, SET_LOADING, SET_ERROR } from "../actions";

const initialState = {
  isLoading: true,
  error: { show: false, msg: "" },
  trending: [],
  popularMovies: [],
  popularSeries: [],
  topRatedMovies: [],
  topRatedSeries: [],
};

const HighlightsContext = createContext();

export const HighlightsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchHighlighted = async () => {
      const getTrending = axios.get(getTrendingUrl());
      const getPopularMovies = axios.get(getPopularUrl("movie"));
      const getPopularSeries = axios.get(getPopularUrl("tv"));
      const getTopRatedMovies = axios.get(getTopRatedUrl("movie"));
      const getTopRatedSeries = axios.get(getTopRatedUrl("tv"));

      dispatch({ type: SET_LOADING });

      try {
        const [
          trendingData,
          popularMData,
          popularSData,
          topRatedMData,
          topRatedSData,
        ] = await axios.all([
          getTrending,
          getPopularMovies,
          getPopularSeries,
          getTopRatedMovies,
          getTopRatedSeries,
        ]);

        dispatch({
          type: GET_HIGHLIGHTS,
          payload: { trendingData, popularMData, popularSData, topRatedMData, topRatedSData },
        });
      } catch (err) {
        console.log(err);
        dispatch({ type: SET_ERROR, payload: "Something went wrong..." });
      }
    };

    fetchHighlighted();
  }, []);

  return <HighlightsContext.Provider value={{ ...state }}>{children}</HighlightsContext.Provider>;
};

export const useHighlightsContext = () => {
  return useContext(HighlightsContext);
};
