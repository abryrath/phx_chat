import React from 'react';
import Chat from './chat';
import NavLink from './nav-link';

interface AppProps {
  defaultRoom: string;
  //   chatStore: ChatStore,
}

declare global {
  interface Window {
    [key: string]: string;
  }
}

const App: React.FC<AppProps> = (props: AppProps) => {
  const { defaultRoom } = props;
  const [userToken, setUserToken] = React.useState('');

  const logout = () => {
    window
      .fetch('/session', {
        method: 'DELETE',
        headers: {
          'x-csrf-token': '',
        },
      })
      .then(() => {
        window.location = '/';
      });
  };

  React.useEffect(() => {
    setUserToken(window.userToken || '');
    // logoutRef.current.addEventListener('click', logout);
  }, []);

  return (
    <div className="w-full h-full">
      <nav className="absolute py-3 mb-3 pr-2 top-0 left-0 flex w-screen bg-gray-800">
        <div className="flex flex-row">
          <NavLink newWindow={true} href="https://github.com/abryrath/phx_chat">Source</NavLink>
          <NavLink href="https://github.com/abryrath/phx_chat">About</NavLink>
        </div>
        <div className="flex flex-row ml-auto">
          <NavLink href="/registration/edit">Change Password</NavLink>
          <NavLink href="/">Logout</NavLink>
        </div>
      </nav>
      <Chat
        userToken={userToken}
        room={defaultRoom}
        // messages={messages}
        // setMessages={setMessages}
      />
    </div>
  );
};

export default App;
