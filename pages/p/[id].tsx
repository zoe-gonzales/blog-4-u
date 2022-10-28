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
import { UpvoteButtonGroup as PostUpvoteButtonGroup } from "../../components/PostUpvoteButtonGroup";
import { UpvoteButtonGroup as CommentUpvoteButtonGroup } from "../../components/CommentUpvoteButtonGroup";

const Comment = styled.article`
  background: rgba(144, 173, 198, 0.5);
  padding: 10px;
  flex-shrink: 0;
  flex-grow: 1;
`;

const Button = styled.button`
  ${buttonStyles}
  margin-right: 8px;
`;

const SmallButton = styled.button`
  ${buttonStyles}
  padding: 7px 14px;
  margin-top: 12px;
`;

const SubmitButton = styled.input`
  ${buttonStyles}
  margin-top: 8px;
`;

const PostWrapper = styled.article`
  flex-shrink: 0;
  flex-grow: 1;
  margin: 0 0 20px 20px;
`;

const FlexSection = styled.section`
  display: flex;
`;

const CommentWrapper = styled.section`
  display: flex;
  margin: 20px 0;
`;

const PostHeading = styled.h2`
  margin: 0;
`;

const FittedParagraph = styled.p`
  margin: 0;
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
        select: { id: true, content: true, author: true, upvoteCount: true },
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

async function deleteComment(id: string, postId: string): Promise<void> {
  await fetch(`/api/comment/${id}`, {
    method: "DELETE",
  });
  Router.push(`/p/${postId}`);
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
      <FlexSection>
        <PostUpvoteButtonGroup
          postId={props.id}
          upvoteCount={props.upvoteCount}
        />
        <PostWrapper>
          <PostHeading>{title}</PostHeading>
          <p>By {props?.author?.name || "Unknown author"}</p>
          <ReactMarkdown children={props.content} />
          {!props.published && userHasValidSession && postBelongsToUser && (
            <Button onClick={() => publishPost(props.id)}>Publish</Button>
          )}
          {userHasValidSession && postBelongsToUser && (
            <Button onClick={() => deletePost(props.id)}>Delete</Button>
          )}
        </PostWrapper>
      </FlexSection>
      <section>
        <hr />
        <h2>Comments</h2>
        {props.comments.map((comment: any) => (
          <CommentWrapper key={comment.id}>
            <CommentUpvoteButtonGroup
              commentId={comment.id}
              upvoteCount={comment.upvoteCount}
            />
            <Comment>
              <FittedParagraph>{comment.content}</FittedParagraph>
              <small>by {comment.author.name}</small>
              <br />
              {userHasValidSession &&
                session?.user?.email === comment.author?.email && (
                  <SmallButton
                    onClick={() => deleteComment(comment.id, props.id)}
                  >
                    Delete comment
                  </SmallButton>
                )}
            </Comment>
          </CommentWrapper>
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
