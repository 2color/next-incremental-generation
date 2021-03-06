import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const post = await prisma.post.create({
      data: {
        title: `New Post ✍️`,
        excerpt: `This is a sample post (created: ${new Date().toUTCString()})`,
        comments: {
          create: [
            {
              comment: 'Comment 1',
            },
            {
              comment: 'Comment 2',
            },
            {
              comment: 'Comment 3',
            },
          ],
        },
      },
    })
    res.json(post)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    )
  }
}
