import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import styled from "styled-components";
import { buttonStyles, textAreaStyles, linkStyles } from "../components/styled";

const Button = styled.input`
  ${buttonStyles}
`;

const Textarea = styled.textarea`
  ${textAreaStyles}
`;

const BackLink = styled.a`
  ${linkStyles}
  margin-left: 1rem
`;

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
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
          <input
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
