import React from 'react';
import { Socket } from 'phoenix';

interface ChatProps {
  userToken: string;
  room: string;
}

const Chat: React.FunctionComponentElement<ChatProps> = (props: ChatProps) => {
  const { userToken, room } = props;
  const [socket, setSocket] = React.useState(undefined);
  const [channel, setChannel] = React.useState(undefined);

  React.useEffect(() => {
    const s = new Socket('/socket', {
      params: {
        token: userToken,
      },
    });
    s.connect();
    setSocket(s);

    const c = s.channel(`room:${room}`);
    c.join()
      .receive('ok', resp => console.log('Joined', resp))
      .receive('error', resp => console.error('error joining', resp));
    setChannel(c);
  }, []);

  // React.useEffect(() => {

  // }, [room]);

  return (
    <div>
      {/* <pre>{socket && JSON.stringify(socket, null, 2)}</pre> */}
      {/* <pre>{channel && JSON.stringify(channel.name, null, 2)}</pre> */}
    </div>
  );
};

export default Chat;
