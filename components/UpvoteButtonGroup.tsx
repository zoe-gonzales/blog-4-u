import React from "react";
import Router from "next/router";
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

const FlexItem = styled.p`
  font-size: 20px;
  flex-basis: 0;
  text-align: center;
`;

async function createUpvote(postId: any, commentId): Promise<void> {
  const body = { postId, commentId };
  await fetch(`/api/upvote`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

async function destroyUpvote(id: string): Promise<void> {
  await fetch(`/api/upvote/${id}`, {
    method: "DESTROY",
  });
}

const UpvoteButtonGroup = (props) => {
  const { postId, commentId = null } = props;
  return (
    <FlexSection>
      <UpvoteButton onClick={() => createUpvote(postId, commentId)}>
        ⬆️
      </UpvoteButton>
      <UpvoteButton destroyUpvote={destroyUpvote}>⬇️</UpvoteButton>
      <FlexItem>0</FlexItem>
    </FlexSection>
  );
};

export { UpvoteButtonGroup };
