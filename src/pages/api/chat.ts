// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import AiChatHandler from "../../ai/AiChatHandler";
import {config} from "../../config";

const deployBase = config.deployBase
const deployPath = config.deployPath
const deployApiKey = config.deployApiKey
const openAiApiKey = config.openAiApiKey

export type ChatRequest = {
  query: string
  contentHrefs: string[]
}

export type ChatMessage = {

}

export type ChatResponse = {
  chatResponse: string,
  messagesSent: ChatMessage[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ChatRequest>
) {
  const aiChatHandler = new AiChatHandler(deployBase, deployPath, deployApiKey, openAiApiKey);
  const response = await aiChatHandler.getChatResponse(req.body)
  return res.status(200).json(response)
}
