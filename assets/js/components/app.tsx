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
    <div className="w-full m-12">
      <h1 className="text-3xl">Chat</h1>
      <p className="text-lg">Default Room: {defaultRoom}</p>
      <Chat userToken={userToken} room={defaultRoom}/>
    </div>
  );
};

export default App;
