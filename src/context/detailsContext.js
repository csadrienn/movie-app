import React, { createContext, useContext, useEffect, useReducer } from "react";
import { detailsReducer as reducer } from "../reducers/detailsReducer";
import {
  SET_SHOW_LOADING,
  SET_SHOW_ERROR,
  SET_PERSON_LOADING,
  SET_PERSON_ERROR,
  GET_PERSON_DETAILS,
  GET_SHOW_DETAILS,
  GET_SEASON_DETAILS,
  GET_REVIEWS,
  SET_REVIEWS_LOADING,
} from "../actions";
import { getDetailsUrl, getEpisodesUrl, getReviewsUrl } from "../utils/api";
import axios from "axios";

const initialState = {
  isShowLoading: false,
  showError: { show: false, msg: "" },
  movieDetails: null,
  seriesDetails: null,
  showDetails: null,
  seasonDetails: null,
  type: "",
  personDetails: null,
  isPersonLoading: false,
  personError: { show: false, msg: "" },
  reviews: [],
  totalReviews: 0,
  reviewLoading: false,
  isMoreReview: false,
  reviewPage: 1,
};

const DetailsContext = createContext();

export const DetailsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchShowDetails = async (id, type) => {
    dispatch({ type: SET_SHOW_LOADING });
    try {
      const appendix =
        type === "movie"
          ? "credits,images,videos,recommendations,reviews,external_ids"
          : "aggregate_credits,images,videos,recommendations,reviews,external_ids";
      const data = await axios.get(getDetailsUrl(id, type === "movie" ? type : "tv", appendix));

      dispatch({ type: GET_SHOW_DETAILS, payload: { details: data.data, type } });
    } catch (err) {
      console.log(err);
      dispatch({ type: SET_SHOW_ERROR });
    }
  };

  const fetchSeasonDetails = async (seriesId, seasonNumber) => {
    try {
      const data = await axios.get(getEpisodesUrl(seriesId, seasonNumber));
      dispatch({ type: GET_SEASON_DETAILS, payload: data.data });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPersonDetails = async personId => {
    dispatch({ type: SET_PERSON_LOADING });
    try {
      const data = await axios.get(
        getDetailsUrl(personId, "person", "combined_credits,external_ids,images")
      );
      dispatch({ type: GET_PERSON_DETAILS, payload: data.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: SET_PERSON_ERROR });
    }
  };

  const fetchReviews = async (id, page) => {
    dispatch({ type: SET_REVIEWS_LOADING });
    try {
      const data = await axios.get(getReviewsUrl(id, state.type, page));
      dispatch({ type: GET_REVIEWS, payload: data.data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DetailsContext.Provider
      value={{ ...state, fetchShowDetails, fetchSeasonDetails, fetchPersonDetails, fetchReviews }}
    >
      {children}
    </DetailsContext.Provider>
  );
};

export const useDetailsContext = () => useContext(DetailsContext);
