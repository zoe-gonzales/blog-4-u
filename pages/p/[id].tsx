import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { PostProps } from "../../components/Post";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import styled from "styled-components";
import { buttonStyles } from "../../components/styled";

const Comment = styled.article`
  background-color: #90adc6;
  padding: 15px 20px;
  margin: 20px;
`;

const Button = styled.button`
  ${buttonStyles}
  margin-right: 8px;
`;

const SubmitButton = styled.input`
  ${buttonStyles}
  margin-top: 8px;
`;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postData = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
      comments: {
        select: { id: true, content: true, author: true },
      },
    },
  });
  const post = JSON.parse(JSON.stringify(postData));
  return {
    props: post,
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  const [content, setContent] = React.useState("");
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;

  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { content, postId: props.id };
      await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push(`/p/${props.id}`);
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <section>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
        {!props.published && userHasValidSession && postBelongsToUser && (
          <Button onClick={() => publishPost(props.id)}>Publish</Button>
        )}
        {userHasValidSession && postBelongsToUser && (
          <Button onClick={() => deletePost(props.id)}>Delete</Button>
        )}
      </section>
      <section>
        <hr />
        <h2>Comments</h2>
        {props.comments.map((comment: any) => (
          <Comment key={comment.id}>
            <p>{comment.content}</p>
            <small>by {comment.author.name}</small>
          </Comment>
        ))}
      </section>
      <form onSubmit={submitData}>
        <h2>Leave a comment</h2>
        <textarea
          cols={50}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          value={content}
        />
        <br />
        <SubmitButton disabled={!content} type="submit" value="Comment" />
      </form>
    </Layout>
  );
};

export default Post;
