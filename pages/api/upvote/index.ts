import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { postId, commentId } = req.body;
  const requestData = {} as any;
  if (postId) {
    requestData.post = { connect: { id: postId } };
  }
  if (commentId) {
    requestData.comment = { connect: { id: commentId } };
  }
  const session = await getSession({ req });

  const result = await prisma.upvote.create({
    data: {
      post: { connect: { id: postId } },
      user: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
