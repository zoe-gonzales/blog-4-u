import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const commentId = req.query.id;
  if (req.method === "DELETE") {
    const comment = await prisma.comment.delete({
      where: { id: commentId },
    });
    res.json(comment);
  } else if (req.method === "PUT" && req.query.type === "increment") {
    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: { upvoteCount: { increment: 1 } },
    });
    res.json(comment);
  } else if (req.method === "PUT" && req.query.type === "decrement") {
    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: { upvoteCount: { decrement: 1 } },
    });
    res.json(comment);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
