import React from 'react';

interface ChatMessagesProps {
  messages: string[];
}

const ChatMessages: React.FunctionComponentElement<ChatMessagesProps> = props => {
  const { messages } = props;

//   if (messages.length < 1) {
//     return <div>No messages{JSON.stringify(messages, null, 2)}</div>;
//   }
  return (
    <div>
      {messages.map((msg: string, i: Number) => (
        <div key={i}>{msg}</div>
      ))}
      {JSON.stringify(messages, null, 2)}
    </div>
  );
};

export default ChatMessages;
