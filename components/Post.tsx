import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  comments: any[];
  upvoteCount: number;
};

const PostWrapper = styled.article`
  color: inherit;
  padding: 2rem;
`;

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <PostWrapper onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
    </PostWrapper>
  );
};

export default Post;
