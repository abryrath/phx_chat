import React from 'react';

interface ChatMessagesProps {
  messages: string[];
}

const ChatMessages: React.FC<ChatMessagesProps> = props => {
  const { messages } = props;

  if (!messages.length) {
    return <div></div>;
  }
  return (
    <div className="self-start w-full">
      {messages &&
        messages.length &&
        messages
          .reverse()
          .filter((m, i) => i < 10)
          .map((msg: string, i: number) => (
            <div className="bg-gray-200 rounded m-2 p-2" key={i}>
              {msg}
            </div>
          ))}
      {/* {JSON.stringify(messages, null, 2)} */}
    </div>
  );
};

export default ChatMessages;
