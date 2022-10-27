import React from "react";
import styled from "styled-components";

const UpvoteButton = styled.button`
  border: none;
  font-size: 20px;
  cursor: pointer;
  flex-basis: 0;
`;

const FlexSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const UpvoteButtonGroup = () => {
  return (
    <FlexSection>
      <UpvoteButton>⬆️</UpvoteButton>
      <UpvoteButton>⬇️</UpvoteButton>
    </FlexSection>
  );
};

export { UpvoteButtonGroup };
