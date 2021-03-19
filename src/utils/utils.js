import React from "react";
import { RiFacebookBoxFill, RiInstagramFill, RiTwitterFill, RiGlobalLine } from "react-icons/ri";

//build a card object with unified properties
export const makeCardItem = result => {
  let cardItem = {
    id: result.id,
    heading: "",
    imgPath: "",
    year: "",
    rating: null,
    department: "",
    url: "",
  };
  if (result.media_type === "person") {
    cardItem = {
      ...cardItem,
      heading: result.name,
      imgPath: result.profile_path,
      department: result.known_for_department,
      url: "/person/",
    };
  } else if (result.media_type === "movie") {
    cardItem = {
      ...cardItem,
      heading: result.title,
      imgPath: result.poster_path,
      year: result.release_date ? result.release_date.slice(0, 4) : null,
      rating: result.vote_average,
      url: "/movie/",
    };
  } else if (result.media_type === "tv") {
    cardItem = {
      ...cardItem,
      heading: result.name,
      imgPath: result.poster_path,
      year: result.first_air_date ? result.first_air_date.slice(0, 4) : null,
      rating: result.vote_average,
      url: "/series/",
    };
  }
  return cardItem;
};

export const makeExternalLinkList = (homepage, extarnalIds) => {
  return [
    { icon: <RiGlobalLine className="icon" />, baseUrl: "", url: homepage },
    {
      icon: <RiFacebookBoxFill className="icon" />,
      baseUrl: "https://www.facebook.com/",
      url: extarnalIds.facebook_id,
    },
    {
      icon: <RiTwitterFill className="icon" />,
      baseUrl: "https://twitter.com/",
      url: extarnalIds.twitter_id,
    },
    {
      icon: <RiInstagramFill className="icon" />,
      baseUrl: "https://www.instagram.com/",
      url: extarnalIds.instagram_id,
    },
  ];
};

//create an array on arrays where the subarrays have a specified length
export const splitArray = (array, stop) => {
  const wholeArray = [...array];
  const split = [];
  while (wholeArray.length) {
    split.push(wholeArray.splice(0, stop));
  }
  return split;
};

export const getMonthName = (monthNum, short) => {
  switch (monthNum) {
    case 0:
      return short ? "Jan" : "Januar";
    case 1:
      return short ? "Feb" : "February";
    case 2:
      return short ? "Mar" : "March";
    case 3:
      return short ? "Apr" : "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return short ? "Aug" : "August";
    case 8:
      return short ? "Sept" : "September";
    case 9:
      return short ? "Oct" : "October";
    case 10:
      return short ? "Nov" : "November";
    case 11:
      return short ? "Dec" : "December";
  }
};

export const formDate = (oldDate, isShortMonth = false) => {
  const date = new Date(oldDate);
  const year = date.getFullYear();
  const month = getMonthName(date.getMonth(), isShortMonth);
  const day = date.getDate();

  return `${year} ${month} ${day}.`;
};

export const formatPrice = number => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(number);
};
