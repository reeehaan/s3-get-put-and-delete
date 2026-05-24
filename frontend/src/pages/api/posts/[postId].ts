// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createRouter } from "next-connect"
import type { NextApiRequest, NextApiResponse } from 'next'
import { deletePost } from '../../../server/posts'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.delete("/api/posts/:id", async (req, res) => {
  const { postId } = req.query
  if (typeof postId === 'string') {
    const post = await deletePost(postId)
    res.send(post)
  } else {
    res.status(400).end()
  }
})

export default router.handler({
  onError: (err: unknown, req, res) => {
    console.error((err as Error).stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})