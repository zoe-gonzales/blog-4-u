import React, { useState } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Router from "next/router";
import styled from "styled-components";
import prisma from "../lib/prisma";
import { buttonStyles, textAreaStyles, linkStyles } from "../components/styled";

const Button = styled.input`
  ${buttonStyles}
`;

const Textarea = styled.textarea`
  ${textAreaStyles}
`;

const Input = styled.input`
  ${textAreaStyles}
  width: 75%;
`;

const Select = styled.select`
  ${textAreaStyles}
  width: 75%;
`;

const BackLink = styled.a`
  ${linkStyles}
  margin-left: 1rem
`;

export const getStaticProps: GetStaticProps = async () => {
  const spaces = await prisma.space.findMany();
  return {
    props: { spaces },
  };
};

interface Props {
  spaces: any[];
}

const Draft: React.FC<Props> = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const spaceId = e.target[0].value;
      const body = { title, content, spaceId };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <label htmlFor="space">Which space do you want to post in?</label>
          <br />
          <Select name="space" id="space">
            {props.spaces.map((space) => (
              <option value={space.id}>{space.title}</option>
            ))}
          </Select>
          <br />
          <Input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <Textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <Button disabled={!content || !title} type="submit" value="Create" />
          <BackLink className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </BackLink>
        </form>
      </div>
    </Layout>
  );
};

export default Draft;
