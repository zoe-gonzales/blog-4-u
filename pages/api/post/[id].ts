import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const postId = req.query.id;
  if (req.method === "DELETE") {
    const post = await prisma.post.delete({
      where: { id: postId },
    });
    res.json(post);
  } else if (req.method === "PUT" && req.query.type === "increment") {
    const post = await prisma.post.update({
      where: { id: postId },
      data: { upvoteCount: { increment: 1 } },
    });
    res.json(post);
  } else if (req.method === "PUT" && req.query.type === "decrement") {
    const post = await prisma.post.update({
      where: { id: postId },
      data: { upvoteCount: { decrement: 1 } },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
