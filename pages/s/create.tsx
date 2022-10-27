import React, { useState } from "react";
import Layout from "../../components/Layout";
import Router from "next/router";
import styled from "styled-components";
import {
  buttonStyles,
  textAreaStyles,
  linkStyles,
} from "../../components/styled";

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

const BackLink = styled.a`
  ${linkStyles}
  margin-left: 1rem
`;

const DraftSpace: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, description };
      await fetch("/api/space", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/s");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Space</h1>
          <Input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What is the name of your space?"
            type="text"
            value={title}
          />
          <Textarea
            cols={50}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Make this short enough so that people will read it, but long enough to give a good idea of the topics covered in this space."
            rows={8}
            value={description}
          />
          <Button
            disabled={!description || !title}
            type="submit"
            value="Create"
          />
          <BackLink className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </BackLink>
        </form>
      </div>
    </Layout>
  );
};

export default DraftSpace;
