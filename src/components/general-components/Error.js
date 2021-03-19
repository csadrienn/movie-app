import React from "react";
import styled from "styled-components";

const Error = ({ msg }) => {
  return (
    <StyledError className="centered-content">
      <h4>{msg}</h4>
    </StyledError>
  );
};

export default Error;

const StyledError = styled.section`
  text-align: center;
`;
