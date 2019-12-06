import React from 'react';
// import { observer, useObservable } from 'mobx-react-lite';
import { useStore } from 'mobx-react-lite-context';
import Store, { IStore } from '../store';
import Messages from '../context';
// import { IMessageContext } from '../context/index';

interface ChatMessagesProps {
  messages: string[];
}

const ChatMessages: React.FC<ChatMessagesProps> = props => {
    const { messages } = props;
    console.log('chat-messages', messages);
  //   const { chat }: IStore = useStore<IStore>(Store);
  // const messages = React.useContext(Messages);
  //   const messages = useObservable([]);

  //   if (messages.length < 1) {
  //     return <div>No messages{JSON.stringify(messages, null, 2)}</div>;
  //   }
  return (
    <div>
      {messages &&
        messages.length &&
        messages.map((msg: string, i: number) => (
          <div className="bg-gray-200 rounded m-2 p-2" key={i}>
            {msg}
          </div>
        ))}
      {JSON.stringify(messages, null, 2)}
    </div>
  );
};


export default ChatMessages;
