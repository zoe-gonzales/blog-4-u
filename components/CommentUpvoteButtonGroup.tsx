import React, { useState } from "react";
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
  margin: 5px 0;
`;

type ClickType = "increment" | "decrement";

const handleClick = async (
  commentId: string,
  type: ClickType
): Promise<any> => {
  return await fetch(`/api/comment/${commentId}?type=${type}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((post) => post);
};

const UpvoteButtonGroup = (props) => {
  const { commentId, upvoteCount } = props;
  const [count, setCount] = useState(upvoteCount);
  const incrementCount = async () => {
    const post = await handleClick(commentId, "increment");
    setCount(post.upvoteCount);
  };
  const decrementCount = async () => {
    const post = await handleClick(commentId, "decrement");
    setCount(post.upvoteCount);
  };

  return (
    <FlexSection>
      <UpvoteButton onClick={incrementCount}>⬆️</UpvoteButton>
      <FlexItem>{count}</FlexItem>
      <UpvoteButton onClick={decrementCount}>⬇️</UpvoteButton>
    </FlexSection>
  );
};

export { UpvoteButtonGroup };
