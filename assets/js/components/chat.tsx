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

const Chat: React.FC<ChatProps> = (props: ChatProps) => {
  const { userToken, room } = props;
  const [socket, setSocket] = React.useState(undefined);
  const [channel, setChannel] = React.useState(undefined);
  const [messages, setMessages] = React.useState([]);
  const messagesRef = React.useRef<string[]>([]);
  //   const messages =
  //   const [messages, setMessages] = React.useState([]);

  const newMessageListener = async ({ body }: IMessage) => {
    console.log('message received', body);
    setMessages([body, ...messagesRef.current]);
  };

  React.useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
  const pingListener = async () => {
    console.log('ping received');
    // chat.push('PING');
    // messages.add('PING');
    // const m = ['[PING]', ...messages];
    // console.log(m);
    // m.push(`[PING]`);
    // setMessages(m);
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
      //   console.log('channel is undefined');
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
