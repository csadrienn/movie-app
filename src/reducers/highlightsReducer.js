import { GET_HIGHLIGHTS, SET_ERROR, SET_LOADING } from "../actions";

export const highlightsReducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true };
  }

  if (action.type === GET_HIGHLIGHTS) {
    const {
      trendingData,
      popularMData,
      popularSData,
      topRatedMData,
      topRatedSData,
    } = action.payload;

    return {
      ...state,
      trending: trendingData.data.results,
      popularMovies: popularMData.data.results,
      popularSeries: popularSData.data.results,
      topRatedMovies: topRatedMData.data.results,
      topRatedSeries: topRatedSData.data.results,
      isLoading: false,
    };
  }
  if (action.type === SET_ERROR) {
    return { ...state, isLoading: false, error: { show: true, msg: action.payload } };
  }
  throw new Error(`no matching "${action.type}" action type`);
};
