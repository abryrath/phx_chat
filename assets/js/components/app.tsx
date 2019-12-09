import React from 'react';
import Chat from './chat';
import Nav from './nav';

interface AppProps {
  defaultRoom: string;
}

declare global {
  interface Window {
    [key: string]: string;
  }
}

const App: React.FC<AppProps> = (props: AppProps) => {
  const { defaultRoom } = props;

  return (
    <div className="w-full h-full">
      <Nav/>
      <Chat
        userToken={window.userToken}
        room={defaultRoom}
      />
    </div>
  );
};

export default App;
