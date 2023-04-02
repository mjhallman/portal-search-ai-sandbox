import {ChatResponse} from "../../pages/api/chat";
import React from "react";
import {Label} from "@mui/icons-material";
import Link from "next/link";


export type ChatResponseProps = {
  chatResponse: ChatResponse
}

const ChatResponseDisplay = (props: ChatResponseProps) => {
  const {chatResponse} = props;

  const answerHtml = chatResponse.chatResponse.answer
  return (
    <div className="chat-response">
      <div>
        <h3>Answer</h3>
        <div>
          <div dangerouslySetInnerHTML={{__html: answerHtml}}/>
        </div>

        <div><b>Confidence</b>: {chatResponse.chatResponse.confidence}</div>
        <div><b>Sources</b>:
            {chatResponse.chatResponse.sourceLinks.map((source, index) => {
              return <div>
                <Link href={source.href} target={"_blank"}>{source.title}</Link>
              </div>
            })}
        </div>

        <hr/>

        <br/><br/>
        <h3>Messages Sent</h3>
        <div>
          {chatResponse.messagesSent.map((message, index) => {
            return (
              <div key={index} className="messageContainer">
                <div><b>Role:</b> {message.role}</div>
                <div><b>Content:</b> <pre>{message.content}</pre></div>
              </div>
            )
          })}
        </div>


        <div className="chat-response-header-subtitle">
          {chatResponse.subtitle}
        </div>
      </div>
      <div className="chat-response-body">
        {chatResponse.body}
      </div>
    </div>
  );
}

export default ChatResponseDisplay