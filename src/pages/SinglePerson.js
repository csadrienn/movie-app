import React, { useEffect } from "react";
import styled from "styled-components";
import {
  PersonHeader,
  Filmography,
  Pictures,
  ScrollSection,
} from "../components/details-components";
import { Loading, Error } from "../components/general-components";
import { useDetailsContext } from "../context/detailsContext";
import { useParams } from "react-router-dom";

const SinglePerson = () => {
  const { personDetails, isPersonLoading, personError, fetchPersonDetails } = useDetailsContext();
  const { id } = useParams();

  useEffect(() => {
    fetchPersonDetails(id);
  }, [id]);

  if (isPersonLoading || !personDetails) {
    return (
      <StyledPerson className="centered-content">
        <Loading />
      </StyledPerson>
    );
  }

  if (personError.show) {
    return (
      <StyledPerson className="centered-content">
        <Error>{personError.msg}</Error>
      </StyledPerson>
    );
  }

  const imgPaths = personDetails.images.profiles.map(pic => {
    return { path: pic.file_path, orientation: "portrait" };
  });
  const name = personDetails.name;

  const department = personDetails.known_for_department;
  const { cast, crew } = personDetails.combined_credits;

  // filter the credits by the department the person know for and sort them by the number of votes
  const knownForList =
    department === "Acting"
      ? cast.sort((credit1, credit2) => credit2.vote_count - credit1.vote_count)
      : crew
          .filter(credit => credit.department === department)
          .sort((credit1, credit2) => credit2.vote_count - credit1.vote_count);
  //filter out the duplicates (if a person has multiple credit in the same show)
  const seen = new Set();
  const filteredKnownForList = knownForList.filter(el => {
    const duplicate = seen.has(el.id);
    seen.add(el.id);
    return !duplicate;
  });

  return (
    <StyledPerson>
      <div className="content">
        <PersonHeader />

        <ScrollSection
          heading="Known for"
          results={filteredKnownForList}
          total={filteredKnownForList.length}
          type="person"
          msg={`No credits for this person.`}
        />
        <Filmography />
        <Pictures imgPaths={imgPaths} name={name} />
      </div>
    </StyledPerson>
  );
};

export default SinglePerson;

const StyledPerson = styled.main`
  .content {
    .dark-section {
      margin-bottom: 2rem;
    }
  }
`;
