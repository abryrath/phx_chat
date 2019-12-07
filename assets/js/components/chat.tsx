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
  const [connected, setConnected] = React.useState(false);
  const [channel, setChannel] = React.useState(undefined);
  const [messages, setMessages] = React.useState([]);
  const messagesRef = React.useRef<string[]>([]);
  //   const messages =
  //   const [messages, setMessages] = React.useState([]);

  const newMessageListener = async ({ body, email }: IMessage) => {
    console.log(`message received from ${email}`, body);
    setMessages([body, ...messagesRef.current]);
  };

  

  const pingListener = async ({ body, email }) => {
    console.log('ping received', email);
    setMessages(['[PING]', ...messagesRef.current]);
  };

  const joinListener = async ({ email, room_id }) => {
      console.log('new join', email);
      setMessages([`[User joined: ${email}, room: ${room_id}]`, ...messagesRef.current]);
  }

  // Effects 

  React.useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  React.useEffect(() => {
      setConnected(false);
    if (!userToken) {
        return;
    }
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
    setConnected(true);
  }, [userToken]);

  React.useEffect(() => {
    if (!channel) {
      //   console.log('channel is undefined');
      return;
    }
    console.log('channel is defined');
    channel.on('new_msg', newMessageListener);
    channel.on('ping', pingListener);
    channel.on('after_join', joinListener);
  }, [channel]);

  return (
    <div>
      {connected ? (<ChatMessages messages={messages} />) : 'Connecting...'}
      <ChatInput channel={channel} />
    </div>
  );
};

export default Chat;
