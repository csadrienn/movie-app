const baseUrl = "https://api.themoviedb.org/3/";
let key = process.env.REACT_APP_KEY;
if (process.env.NODE_ENV === "production") {
  key = process.env.REACT_APP_KEY;
}

export const getSearchUrl = (searchQuery, category, page = 1) => {
  return `${baseUrl}search/${category}?api_key=${key}&query=${searchQuery}&page=${page}`;
};
export const getTrendingUrl = () => {
  return `${baseUrl}trending/all/week?api_key=${key}`;
};
export const getPopularUrl = type => {
  return `${baseUrl}${type}/popular?api_key=${key}&page=1`;
};
export const getTopRatedUrl = type => {
  return `${baseUrl}${type}/top_rated?api_key=${key}&page=1`;
};

export const getDetailsUrl = (id, type, appendices = null) => {
  return `${baseUrl}${type}/${id}?api_key=${key}&append_to_response=${
    appendices ? appendices : ""
  }`;
};

export const getReviewsUrl = (id, type, page) => {
  return `${baseUrl}${type}/${id}/reviews?api_key=${key}&page=${page}`;
};

export const getGenresUrl = type => {
  return `${baseUrl}genre/${type}/list?api_key=${key}`;
};

export const getEpisodesUrl = (seriesId, seasonNumber) => {
  return `${baseUrl}tv/${seriesId}/season/${seasonNumber}?api_key=${key}`;
};

export const getDiscoverShowsUrl = (type, sorting, filters, page) => {
  return `${baseUrl}discover/${type}?api_key=${key}&sort_by=${sorting}${filters}&page=${page}`;
};

export const getImgUrl = (size, path) => {
  return `${imgConfig.secure_base_url}${size}${path}`;
};

//img sizes
const imgConfig = {
  base_url: "http://image.tmdb.org/t/p/",
  secure_base_url: "https://image.tmdb.org/t/p/",
  backdrop_sizes: ["w300", "w780", "w1280", "original"],
  logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
  poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
  profile_sizes: ["w45", "w185", "h632", "original"],
  still_sizes: ["w92", "w185", "w300", "original"],
};
