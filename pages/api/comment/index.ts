import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { content, postId } = req.body;

  const session = await getSession({ req });
  const result = await prisma.comment.create({
    data: {
      content: content,
      post: { connect: { id: postId } },
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
