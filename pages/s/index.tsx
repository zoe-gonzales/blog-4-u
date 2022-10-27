import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import Layout from "../../components/Layout";
import styled from "styled-components";
import Router from "next/router";
import { postStyles } from "../../components/styled";

const SpaceWrapper = styled.article`
  ${postStyles}
  padding: 20px;

  &&& {
    margin: 10px 0 0;
  }
`;

const SpaceTitle = styled.h3`
  margin: 3px 0;
`;

const SpaceDescription = styled.p`
  margin: 3px 0;
`;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { spaces: [] } };
  }

  const spaces = await prisma.space.findMany();
  return {
    props: { spaces },
  };
};

const SpaceList: React.FC<any> = (props) => {
  return (
    <Layout>
      <h1>Browse Spaces</h1>
      {props.spaces.map((space) => (
        <SpaceWrapper
          key={space.id}
          onClick={() => Router.push("/s/[id]", `/s/${space.id}`)}
        >
          <SpaceTitle>{space.title}</SpaceTitle>
          <SpaceDescription>{space.description}</SpaceDescription>
        </SpaceWrapper>
      ))}
    </Layout>
  );
};

export default SpaceList;
