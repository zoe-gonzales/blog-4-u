import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const upvoteId = req.query.id;
  if (req.method === "DELETE") {
    const upvote = await prisma.upvote.delete({
      where: { id: upvoteId },
    });
    res.json(upvote);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
