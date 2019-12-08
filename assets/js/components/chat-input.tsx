import React from 'react';
import { Channel } from 'phoenix';

interface ChatInputProps {
  channel: Channel;
}

const ChatInput: React.FC<ChatInputProps> = props => {
  const { channel } = props;

  const textInput: React.RefObject<HTMLTextAreaElement> = React.createRef();
  const sendButton: React.RefObject<HTMLButtonElement> = React.createRef();

  const send = async () => {
    const body: string = textInput.current.value;
    channel.push('new_msg', {
      body,
    });
    textInput.current.value = '';
    textInput.current.focus();
    updateSendButton();
  };

  const ping = async () => {
    await channel.push('ping', {
      body: 'Ping!',
    });
  };

  const updateSendButton = () => {
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
    <div className="m-2 p-2 bg-white flex self-end w-full">
      <textarea
        ref={textInput}
        onKeyUp={updateSendButton}
        className="border rounded font-gray-800 w-2/3 text-md border rouonded px-3 py-2"
        style={{ resize: 'none' }}
      />
      <div className="w-1/3">
        <button
          onClick={send}
          onFocus={updateSendButton}
          onBlur={updateSendButton}
          ref={sendButton}
          className="rounded bg-white m-2 p-2 diabled:bg-black"
        >
          Send
        </button>
        <button onClick={ping} className="rounded bg-white m-2 p-2">
          Ping
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
