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
`;

type ClickType = "increment" | "decrement";

const handleClick = async (postId: string, type: ClickType): Promise<any> => {
  const res = await fetch(`/api/post/${postId}?type=${type}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  return res;
};

const UpvoteButtonGroup = (props) => {
  const { postId, upvoteCount } = props;
  const [count, setCount] = useState(upvoteCount);
  const incrementCount = async () => {
    const post = await handleClick(postId, "increment");
    // setCount(post.upvoteCount);
  };
  const decrementCount = async () => {
    const post = await handleClick(postId, "decrement");
    // setCount(post.upvoteCount);
  };

  return (
    <FlexSection>
      <UpvoteButton onClick={incrementCount}>⬆️</UpvoteButton>
      <UpvoteButton onClick={decrementCount}>⬇️</UpvoteButton>
      <FlexItem>{count}</FlexItem>
    </FlexSection>
  );
};

export { UpvoteButtonGroup };
