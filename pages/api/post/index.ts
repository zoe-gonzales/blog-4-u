import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { title, content, spaceId } = req.body;

  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      space: { connect: { id: spaceId } },
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
