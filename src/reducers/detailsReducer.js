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

export const detailsReducer = (state, action) => {
  switch (action.type) {
    case SET_SHOW_LOADING:
      return { ...state, isShowLoading: true };

    case SET_SHOW_ERROR:
      return {
        ...state,
        isShowLoading: false,
        showError: { show: true, msg: "Ooops, something went wrong...." },
      };

    case GET_SHOW_DETAILS:
      const { details, type } = action.payload;
      const isMoreReview = details.reviews.total_pages > details.reviews.page;

      return {
        ...state,
        showDetails: details,
        isShowLoading: false,
        type: type,
        episodes: null,
        reviews: details.reviews.results,
        reviewPage: details.reviews.page,
        isMoreReview,
        totalReviews: details.reviews.total_results,
      };

    case GET_SEASON_DETAILS:
      const newEpisodes = action.payload.episodes.map(episode => {
        return { ...episode, isFullOverview: false };
      });
      const newSeasonDetails = { ...action.payload, episodes: newEpisodes };
      return { ...state, seasonDetails: newSeasonDetails, isSeasonLoading: false };

    case SET_PERSON_LOADING:
      return { ...state, isPersonLoading: true };

    case SET_PERSON_ERROR:
      return {
        ...state,
        isPersonLoading: false,
        showError: { show: true, msg: "Ooops, something went wrong...." },
      };

    case GET_PERSON_DETAILS:
      return { ...state, personDetails: action.payload, isPersonLoading: false };

    case SET_REVIEWS_LOADING:
      return { ...state, reviewLoading: true };

    case GET_REVIEWS:
      const { page, results, total_pages } = action.payload;
      const isMore = total_pages > page;
      return {
        ...state,
        reviews: [...state.reviews, ...results],
        reviewPage: page,
        reviewLoading: false,
        isMoreReview: isMore,
      };

    default:
      throw new Error(`no matching "${action.type}" action type`);
  }
};
