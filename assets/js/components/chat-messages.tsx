import React from 'react';
import { IDisplayMessage } from '../models/display-message';

interface ChatMessagesProps {
  messages: IDisplayMessage[];
}

const ChatMessages: React.FC<ChatMessagesProps> = props => {
  const { messages } = props;

  if (!messages.length) {
    return <div></div>;
  }
  return (
    <div className="self-start w-full overflow-scroll">
      {messages &&
        messages.length &&
        messages
          .reverse()
          .filter((m, i) => i < 10)
          .map((msg: IDisplayMessage, i: number) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: msg.toHtml() }}></div>
          ))}
    </div>
  );
};

export default ChatMessages;
