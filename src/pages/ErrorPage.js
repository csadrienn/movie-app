import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ErrorPage = () => {
  return (
    <StyledError>
      <h1>404</h1>
      <h3>The page you tried cannot be found.</h3>
      <Link to="/" className="btn">
        Back to Home
      </Link>
    </StyledError>
  );
};

export default ErrorPage;

const StyledError = styled.main`
  width: 100%;
  min-height: 94vh;
  padding: 0 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    font-size: 8rem;
    color: var(--clr-primary);
    margin-bottom: 2rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: normal;
    margin-bottom: 2rem;
  }

  .btn {
    border: 2px solid var(--clr-primary);
    background-color: transparent;
    color: var(--clr-primary);
  }
`;
