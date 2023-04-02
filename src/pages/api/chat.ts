// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export type ChatRequest = {
  query: string
  hrefs: string[]
}

export type ChatMessage = {

}

export type ChatResponse = {
  chatResponse: string,
  messagesSent: ChatMessage[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatRequest>
) {
  res.status(200).json({ name: 'John Doe' })
}
