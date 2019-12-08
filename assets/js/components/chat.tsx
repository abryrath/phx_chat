import React from 'react';
import { Socket, Channel } from 'phoenix';
import ChatInput from './chat-input';
import ChatMessages from './chat-messages';
import DisplayMessage from '../models/display-message';


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
    const message = new DisplayMessage();
    message.sender =  email;
    message.message = body;
    message.self = true;

    //`<span class="font-bold mr-2">${email}</span> ${body}`;
    console.log(`message received from ${email}`, body);
    setMessages([message, ...messagesRef.current]);
  };

  const pingListener = async ({ body, email }) => {
    // console.log('ping received', email);
    const message = new DisplayMessage();
    message.sender = email;
    message.message =  'PING'
    message.self = false;
    setMessages([message, ...messagesRef.current]);
  };

  const joinListener = async ({ email, room_id }) => {
      console.log('new join', email);
      const message = new  DisplayMessage();
      message.sender = email;
      message.message = 'Joined';
      message.self = false;
      setMessages([message, ...messagesRef.current]);
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
      return;
    }

    channel.on('new_msg', newMessageListener);
    channel.on('ping', pingListener);
    channel.on('after_join', joinListener);
  }, [channel]);

  return (
    <div className="flex flex-row flex-wrap items-center justify-center h-full relative bg-gray-200">
      {connected ? (<ChatMessages messages={messages} />) : 'Connecting...'}
      <ChatInput channel={channel} />
    </div>
  );
};

export default Chat;
