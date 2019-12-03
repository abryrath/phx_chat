import React from 'react';
import { Socket, Channel } from 'phoenix';
import ChatInput from './chat-input';
import ChatMessages from './chat-messages';

interface ChatProps {
  userToken: string;
  room: string;
}

interface IMessage {
  body: string;
}

const Chat: React.FunctionComponentElement<ChatProps> = (props: ChatProps) => {
  const { userToken, room } = props;
  const [socket, setSocket] = React.useState(undefined);
  const [channel, setChannel] = React.useState(undefined);
  const [messages, setMessages] = React.useState(['Welcome']);

  const newMessageListener = async ({ body }: IMessage) => {
    console.log('message received', body);
    const m = [body, ...messages];
    // m.push(body);
    console.log(m);
    setMessages(m);
  };

  const pingListener = async () => {
    console.log('ping received');
    const m = ['[PING]', ...messages];
    console.log(m);
    // m.push(`[PING]`);
    setMessages(m);
  };

  React.useEffect(() => {
    const s: Socket = new Socket('/socket', {
      params: {
        token: userToken,
      },
    });
    s.connect();
    setSocket(s);

    const c: Channel = s.channel(`room:${room}`);
    c.join()
      .receive('ok', resp => console.log('Joined', resp))
      .receive('error', resp => console.error('error joining', resp));
    setChannel(c);
  }, []);

  React.useEffect(() => {
    if (!channel) {
      console.log('channel is undefined');
      return;
    }
    console.log('channel is defined');
    channel.on('new_msg', newMessageListener);
    channel.on('ping', pingListener);
  }, [channel]);

  return (
    <div>
      <ChatMessages messages={messages} />
      <ChatInput channel={channel} />
    </div>
  );
};

export default Chat;
