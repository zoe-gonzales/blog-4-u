import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import styled from "styled-components";
import { postStyles, pageStyles } from "../components/styled";

const PostWrapper = styled.article`
  ${postStyles}
`;

const Page = styled.div`
  ${pageStyles}
`;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Page>
        <h1>My Drafts</h1>
        <main>
          {props.drafts.map((post) => (
            <PostWrapper key={post.id}>
              <Post post={post} />
            </PostWrapper>
          ))}
        </main>
      </Page>
    </Layout>
  );
};

export default Drafts;
