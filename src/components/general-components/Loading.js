import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <Spinner>
      <div className="cube1"></div>
      <div className="cube2"></div>
    </Spinner>
  );
};

export default Loading;

const Spinner = styled.div`
  margin: 4rem auto;
  width: 30px;
  height: 30px;
  position: relative;

  .cube1,
  .cube2 {
    background-color: var(--clr-primary);
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0;
    left: 0;

    -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
    animation: sk-cubemove 1.8s infinite ease-in-out;
  }

  .cube2 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  @-webkit-keyframes sk-cubemove {
    25% {
      -webkit-transform: translateX(2.6rem) rotate(-90deg) scale(0.4);
    }
    50% {
      -webkit-transform: translateX(2.6rem) translateY(2.6rem) rotate(-180deg);
    }
    75% {
      -webkit-transform: translateX(0) translateY(2.6rem) rotate(-270deg) scale(0.4);
    }
    100% {
      -webkit-transform: rotate(-360deg);
    }
  }

  @keyframes sk-cubemove {
    25% {
      transform: translateX(42px) rotate(-90deg) scale(0.5);
      -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
    }
    50% {
      transform: translateX(42px) translateY(42px) rotate(-179deg);
      -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
    }
    50.1% {
      transform: translateX(42px) translateY(42px) rotate(-180deg);
      -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
    }
    75% {
      transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
      -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    }
    100% {
      transform: rotate(-360deg);
      -webkit-transform: rotate(-360deg);
    }
  }
`;
