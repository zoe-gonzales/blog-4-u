import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import styled from "styled-components";
import { pageStyles, postStyles } from "../components/styled";

const PostWrapper = styled.article`
  ${postStyles}
`;

const Page = styled.article`
  ${pageStyles}
`;

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Page>
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((post) => (
            <PostWrapper key={post.id}>
              <Post post={post} />
            </PostWrapper>
          ))}
        </main>
      </Page>
    </Layout>
  );
};

export default Blog;
