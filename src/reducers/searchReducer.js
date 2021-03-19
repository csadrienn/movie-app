import {
  SET_LOADING,
  TOGGLE_ERROR,
  SET_SEARCH_QUERY,
  SET_CATEGORY,
  SET_PAGE,
  GET_SEARCH_RESULTS,
  CLEAR_SEARCH,
} from "../actions";

export const searchRecuder = (state, action) => {
  switch (action.type) {
    case TOGGLE_ERROR:
      const { show, msg } = action.payload;
      return { ...state, error: { show, msg } };

    case SET_SEARCH_QUERY:
      return {
        ...state,
        isLoading: true,
        query: action.payload,
        page: 1,
      };

    case SET_CATEGORY:
      return {
        ...state,
        isLoading: true,
        category: action.payload,
        page: 1,
      };

    case GET_SEARCH_RESULTS:
      let newResults = action.payload.results;
      if (state.category !== "multi") {
        newResults = newResults.map(result => {
          return { ...result, media_type: state.category };
        });
      }
      return {
        ...state,
        searchResults: newResults,
        isStarting: false,
        totalPages: action.payload.total_pages,
        isLoading: false,
      };

    case SET_PAGE:
      return { ...state, page: action.payload };

    case CLEAR_SEARCH:
      return {
        ...state,
        category: "multi",
        query: "",
        totalPages: 0,
        isStarting: true,
        isLoading: true,
        searchResults: {},
      };

    default:
      throw new Error(`no matching "${action.type}" action type`);
  }
};
