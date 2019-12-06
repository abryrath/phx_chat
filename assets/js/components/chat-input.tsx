import React from 'react';
import Store from '../store';

interface ChatInputProps {
  channel: Channel;
}

const ChatInput: React.FC<ChatInputProps> = props => {
  const { channel } = props;

  const textInput: React.RefObject<HTMLTextAreaElement> = React.createRef();
  const sendButton: React.RefObject<HTMLButtonElement> = React.createRef();

  const send = async () => {
    const body: string = textInput.current.value;
    await channel.push('new_msg', {
      body,
    });
    textInput.current.value = '';
    textInput.current.focus();
  };

  const ping = async () => {
    await channel.push('ping', {
      body: 'Ping!',
    });
  };

  const updateSendButton = () => {
    // console.log(e);
    if (textInput.current.value !== '') {
      sendButton.current.disabled = false;
      return;
    }
    sendButton.current.disabled = true;
  };

  React.useEffect(() => {
    updateSendButton();
  }, []);

  return (
    // <Store.Consumer>
    //   {() => (
        <div className="m-2 p-2 bg-white flex ">
          <textarea
            ref={textInput}
            onKeyUp={updateSendButton}
            className="border rounded font-gray-800"
            style={{ resize: 'none' }}
          />
          <button
            onClick={send}
            onFocus={updateSendButton}
            onBlur={updateSendButton}
            ref={sendButton}
            className="rounded bg-white m-2 p-2"
          >
            Send
          </button>
          <button onClick={ping} className="rounded bg-white m-2 p-2">
            Ping
          </button>
        </div>
    //   )}
    // </Store.Consumer>
  );
};

export default ChatInput;
