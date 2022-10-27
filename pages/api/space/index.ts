import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { title, description } = req.body;

  const result = await prisma.space.create({
    data: {
      title: title,
      description: description,
    },
  });
  res.json(result);
}
