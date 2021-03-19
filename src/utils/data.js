export const sortOptions = [
  { type: "multi", id: 1, text: "Popularity (desc)", value: "popularity.desc" },
  { type: "multi", id: 2, text: "Popularity (asc)", value: "popularity.asc" },
  { type: "movies", id: 3, text: "Release (desc)", value: "release_date.desc" },
  { type: "movies", id: 4, text: "Release (asc)", value: "release_date.asc" },
  { type: "series", id: 5, text: "Release (desc)", value: "first_air_date.desc" },
  { type: "series", id: 6, text: "Release (asc)", value: "first_air_date.asc" },
  { type: "multi", id: 7, text: "Title (A-Z)", value: "original_title.asc" },
  { type: "multi", id: 8, text: "Title (Z-A)", value: "original_title.desc" },
  { type: "multi", id: 9, text: "Rating (High-Low)", value: "vote_average.desc" },
  { type: "multi", id: 10, text: "Rating (Low-High)", value: "vote_average.asc" },
];

export const ratingOptions = [
  { id: 1, text: "9.0 or Up", value: "9" },
  { id: 2, text: "8.0 or Up", value: "8" },
  { id: 3, text: "7.0 or Up", value: "7" },
  { id: 4, text: "6.0 or Up", value: "6" },
  { id: 5, text: "5.0 or Up", value: "5" },
];

export const releaseOptions = [
  { id: 1, text: "2020 & Later", value: "2020-01-01" },
  { id: 2, text: "2010-2020", value: "2010-01-01,2020-01-01" },
  { id: 3, text: "2000-2010", value: "2000-01-01,2010-01-01" },
  { id: 4, text: "1990-2000", value: "1990-01-01,2000-01-01" },
  { id: 5, text: "1980-1990", value: "1980-01-01,1990-01-01" },
  { id: 6, text: "1970-1980", value: "1970-01-01,1980-01-01" },
  { id: 7, text: "1960-1970", value: "1960-01-01,1970-01-01" },
  { id: 8, text: "1950-1960", value: "1950-01-01,1960-01-01" },
  { id: 9, text: "1950 & Before", value: "1950-01-01" },
];

export const runtimeOptions = [
  { id: 1, text: "under 30 min", value: "30" },
  { id: 2, text: "30-60 min", value: "30-60" },
  { id: 3, text: "60-120 min", value: "60-120" },
  { id: 4, text: "120-180 min", value: "120-180" },
  { id: 5, text: "180-240 min", value: "180-240" },
  { id: 6, text: "240-360 min", value: "240-360" },
  { id: 7, text: "over 360 min", value: "360" },
];
