import React from 'react';
import Chat from './chat';

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

  const logoutRef = React.createRef<HTMLLinkElement>();

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
    logoutRef.current.addEventListener('click', logout);
  }, []);

  return (
    <div className="w-full m-12">
      <nav className="absolute mt-3 mr-2 top-0 left-0 flex w-screen">
          <div className="flex flex-row">
              <div><a href="/">Github </a></div>
          </div>
        <div className="flex flex-row ml-auto">
          <div>
            <a href="/registration/edit" className="underline text-white mr-2">
              Change Password
            </a>
          </div>
          <div>
            <a ref={logoutRef} className="underline text-white mr-2">
              Logout
            </a>
          </div>
        </div>
      </nav>
      <h1 className="text-3xl">Chat</h1>
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
