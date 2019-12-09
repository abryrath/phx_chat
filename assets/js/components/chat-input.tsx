import React from 'react';
import { Channel } from 'phoenix';
import Button from './button';

interface ChatInputProps {
  channel: Channel;
}

const ChatInput: React.FC<ChatInputProps> = props => {
  const { channel } = props;

  const textInput: React.RefObject<HTMLTextAreaElement> = React.createRef();
  const sendButton: React.RefObject<HTMLButtonElement> = React.createRef<
    HTMLButtonElement
  >();

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
        <Button
          onClick={send}
          onFocus={updateSendButton}
          onBlur={updateSendButton}
          ref={sendButton}
          primary
        >
          Send
        </Button>
        <Button onClick={ping}>
          Ping
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
