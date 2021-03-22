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

export const discoverReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true, error: { show: false, msg: "" } };

    case SET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: { show: true, msg: "Oops, something went wrong..." },
      };

    case GET_SHOWS:
      const { data, pageType, page } = action.payload;
      let shows;

      const newShows = data.results.map(result => {
        return { ...result, media_type: pageType === "series" ? "tv" : pageType };
      });
      if (page > 1) {
        shows = [...state.shows, ...newShows];
      } else {
        shows = newShows;
      }

      return {
        ...state,
        shows,
        type: pageType,
        isLoading: false,
        isStarting: false,
        page,
        totalPages: data.total_pages,
      };

    case SET_SORTING:
      return { ...state, sorting: action.payload, page: 1, totalPages: -1 };

    case RESET_SHOWS:
      return {
        ...state,
        type: "",
        sorting: "popularity.desc",
        filters: { ratings: "", released: "", runtime: "", genres: [] },
        isStarting: true,
        totalPages: -1,
      };

    case GET_GENRES:
      const { movieGenres, seriesGenres } = action.payload;
      const newMoviGenres = movieGenres.map(genre => {
        return { ...genre, active: false };
      });
      const newSeriesGenres = seriesGenres.map(genre => {
        return { ...genre, active: false };
      });
      return {
        ...state,
        movieGenres: newMoviGenres,
        seriesGenres: newSeriesGenres,
        genresError: false,
        totalPages: -1,
      };

    case SET_GENRE_ERROR:
      return { ...state, genresError: true };

    case SET_FILTERS:
      const { key, value } = action.payload;
      const newFilters = { ...state.filters };
      newFilters[key] = value;
      return { ...state, filters: newFilters, page: 1, totalPages: -1 };

    case CLEAR_FILTERS:
      return { ...state, filters: { ratings: "", released: "", runtime: "", genres: [] }, page: 1 };

    default:
      throw new Error(`no matching "${action.type}" action type`);
  }
};
