import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Post, { PostProps } from "../../components/Post";
import prisma from "../../lib/prisma";
import Layout from "../../components/Layout";
import styled from "styled-components";
import { postStyles } from "../../components/styled";

const PostWrapper = styled.article`
  ${postStyles}
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
          <PostWrapper key={post.id}>
            <Post post={post} />
          </PostWrapper>
        ))
      )}
    </Layout>
  );
};

export default Space;
