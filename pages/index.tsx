import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import styled from "styled-components";
import { pageStyles, postStyles } from "../components/styled";
import { UpvoteButtonGroup } from "../components/UpvoteButtonGroup";

const PostWrapper = styled.article`
  ${postStyles}
  flex-shrink: 0;
  flex-grow: 1;
`;

const Page = styled.article`
  ${pageStyles}
`;

const FlexSection = styled.section`
  display: flex;
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
            <FlexSection key={post.id}>
              <UpvoteButtonGroup
                postId={post.id}
                upvoteCount={post.upvoteCount}
              />
              <PostWrapper>
                <Post post={post} />
              </PostWrapper>
            </FlexSection>
          ))}
        </main>
      </Page>
    </Layout>
  );
};

export default Blog;
