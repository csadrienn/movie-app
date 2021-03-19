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
  SET_TYPE,
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
        allPages: data.total_pages,
        page,
        isMoreShows: data.total_pages > page,
      };

    case SET_SORTING:
      return { ...state, sorting: action.payload, page: 1, isMoreShows: false };

    case RESET_SHOWS:
      return {
        ...state,
        type: "",
        sorting: "popularity.desc",
        filters: { ratings: "", released: "", runtime: "", genres: [], isMoreShow: false },
        isStarting: true,
        isMoreShows: false,
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
        isMoreShows: false,
      };

    case SET_GENRE_ERROR:
      return { ...state, genresError: true };

    case SET_FILTERS:
      const { key, value } = action.payload;
      const newFilters = { ...state.filters };
      newFilters[key] = value;
      return { ...state, filters: newFilters, page: 1, isMoreShows: false };

    case CLEAR_FILTERS:
      return { ...state, filters: { ratings: "", released: "", runtime: "", genres: [] }, page: 1 };

    default:
      throw new Error(`no matching "${action.type}" action type`);
  }
};
