import React from 'react';
import Chat from './chat';

interface AppProps {
  defaultRoom: string;
  type: any;
  key: any;
}

declare global {
  interface Window {
    [key: string]: string;
  }
}

const App: React.FunctionComponentElement<AppProps> = (props: AppProps) => {
  const { defaultRoom } = props;
  const [userToken, setUserToken] = React.useState('');

  React.useEffect(() => {
      setUserToken(window.userToken || '');
  }, []);

  return (
    <div>
      <h1>Chat</h1>
      <p>Default Room: {defaultRoom}</p>
      <Chat userToken={userToken} room={defaultRoom}/>
    </div>
  );
};

export default App;
