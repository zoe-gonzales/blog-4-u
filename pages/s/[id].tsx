import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Post, { PostProps } from "../../components/Post";
import prisma from "../../lib/prisma";
import Layout from "../../components/Layout";
import styled from "styled-components";
import { postStyles } from "../../components/styled";
import { UpvoteButtonGroup } from "../../components/PostUpvoteButtonGroup";

const PostWrapper = styled.article`
  ${postStyles}
  flex-shrink: 0;
  flex-grow: 1;
`;

const FlexSection = styled.section`
  display: flex;
`;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { posts: [] } };
  }

  const posts = await prisma.post.findMany({
    where: {
      space: { id: String(params?.id) },
      published: true,
    },
    include: {
      comments: {
        select: { id: true },
      },
      space: {
        select: { title: true, description: true },
      },
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: { posts },
  };
};

const Space = (props) => {
  return (
    <Layout>
      {props.posts.length === 0 ? (
        <div>Nothing to see here...yet</div>
      ) : (
        props.posts.map((post) => (
          <FlexSection key={post.id}>
            <UpvoteButtonGroup
              postId={post.id}
              upvoteCount={post.upvoteCount}
            />
            <PostWrapper>
              <Post post={post} />
            </PostWrapper>
          </FlexSection>
        ))
      )}
    </Layout>
  );
};

export default Space;
