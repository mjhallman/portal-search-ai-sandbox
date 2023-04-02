import {ChatRequest, ChatResponse} from "../pages/api/chat";
import {Configuration, OpenAIApi} from "openai";
const { convert } = require('html-to-text');

// The first message sent, with role=system
const INITIAL_MESSAGE = "You are Heretto GPT, an assistant used on a documentation site, to help answer questions related to the documentation."

// Prefixed to the user's query, (the last message sent)
const USER_PROMPT_PREFIX = "Answer the following question using only the documentation provided. Respond in JSON containing 4 fields: " +
    "answer (in HTML), " +
    "sourceIds (An array of ids of pages which contained the answer. The id must be one of the ids I provide.), " +
    "confidence (a number between 1 and 100 indicating how well your answer answers the question), " +
    "and info (text containing any extra information you would like to provide)." +
    "Your response must be valid JSON. Include no other information in your response." +
    "If the documentation provided does not provide an answer to the question, respond with the answer 'I am sorry, I cannot answer this question.' QUESTION: "


const cleanRegex = new RegExp('\\[https://storage.googleapis.co.*?\\]')

export type PageLink = {
  href: string
  title: string
}

export type OpenAiResultMessage = {
  answer: string

  // hrefs
  sourceIds: string[]
  sourceLinks: PageLink[]
  confidence: number
  usage: any
}
export default class AiChatHandler {

  deployBase: string
  deployPath: string
  deployApiKey: string
  openAiApi: OpenAIApi

  constructor(deployBase: string, deployPath: string, deployApiKey: string, openAiApiKey: string) {
    this.deployBase = deployBase;
    this.deployPath = deployPath;
    this.deployApiKey = deployApiKey;
    const configuration = new Configuration({
      apiKey: openAiApiKey,
    });
    this.openAiApi = new OpenAIApi(configuration);
  }

  private deployUrl() {
    return `${this.deployBase}${this.deployPath}`
  }

  async getContent(href: string): Promise<any> {
    const params = new URLSearchParams()
    params.set('for-path', href)
    params.set('token', this.deployApiKey)
    return fetch(`${this.deployUrl()}content?${params.toString()}`).then(r => r.json())
    .catch(e => {
      console.log(e)
    })
  }

  htmlToTextForOpenAi(html: string): string {
    const options = {}
    return convert(html, options)
  }

  private cleanText(s: string) {
    return s.replace(cleanRegex, '')
  }

  private buildDocumentationMessage(id: string, title: string, contentHtml: string) {
    const content = `ID: ${id}\nTitle: ${title}\nContent: ${contentHtml}`
    return {
      "role": "user",
      "content": content
    }

  }

  async callOpenAi(userQuery: string, contentResponses: any[]): Promise<ChatResponse> {
    const pageIdToLink = {}
    let count = 1
    const contentMessages = contentResponses.map(pageContent => {
      const id = count++
      pageIdToLink[id] = {
        href: pageContent.href,
        title: pageContent.title
      }
      const text = this.cleanText(this.htmlToTextForOpenAi(pageContent.content))
      return this.buildDocumentationMessage(String(id), pageContent.title, text)
    })

    const initialMessage = {"role": "user", "content": INITIAL_MESSAGE}
    const messages = [
      {"role": "system", "content": "You are Heretto GPT, an assistant used on a documentation site, to help answer questions related "},
      initialMessage,
      ...contentMessages,
      {"role": "user", "content": USER_PROMPT_PREFIX + ' ' + userQuery}
    ]



    console.log(`sending messages: ${JSON.stringify(messages)}`)
    try {
      console.time('createChatCompletion')
      const completion = await this.openAiApi.createChatCompletion({
        temperature: 0,
        model: "gpt-3.5-turbo",
        // @ts-ignore
        messages
      }).catch(e => {
        console.log(`error!`)
        console.log(e)
      })
      console.timeEnd('createChatCompletion')
      if (completion) {
        // const content = completion.data?.choices[0]?.message.content
        console.log(`completion.data: ${JSON.stringify(completion.data)}`)
        // if (content) {
        //     completion.data.choices[0].message.content = DOMPurify.sanitize(content)
        // }
        console.log(`message content: ${completion.data.choices[0].message.content}`)
        const messageJson: OpenAiResultMessage = JSON.parse(completion.data.choices[0].message.content)
        messageJson.usage = completion.data.usage
        messageJson.sourceLinks = []
        console.log(`href to title: ${JSON.stringify(pageIdToLink)}`)
        messageJson.sourceIds.forEach(id => {
          console.log(`---`)
          console.log(`id: ${id}`)
          const pageLink = pageIdToLink[id]
          console.log(`pageLink: ${JSON.stringify(pageLink)}`)
          messageJson.sourceLinks.push(pageLink)
        })
        console.log(`messageJson: ${JSON.stringify(messageJson)}`)
        return {
          chatResponse: messageJson,
          messagesSent: messages
        }
      }
    } catch (e) {
      console.log(`Error calling open ai: ${e}`)
      throw e
    }
  }
  async getChatResponse(chatRequest: ChatRequest): Promise<ChatResponse> {
    const contentResponses = await Promise.allSettled(chatRequest.contentHrefs.map(href => this.getContent(href)))
    const contentResponseValues = contentResponses.filter(p => p.status === 'fulfilled').map(r => r.value)

    // const contentResponses = Promise.allSettled(chatRequest.contentHrefs.map(this.getContent)).filter(p => p.status === 'fulfilled')
    return this.callOpenAi(chatRequest.query, contentResponseValues)

    return {
      chatResponse: contentResponseValues.join('\n'),
      messagesSent: []
    }
  }


}
