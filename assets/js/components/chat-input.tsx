import React from 'react';

interface ChatInputProps {
  channel: Channel;
}

const ChatInput: React.FunctionComponent<ChatInputProps> = props => {
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
    <div>
      <textarea ref={textInput} onKeyUp={updateSendButton} className="border rounded font-gray-800" resizable="false" style={{ resize: 'none' }}/>
      <button
        onClick={send}
        onFocus={updateSendButton}
        onBlur={updateSendButton}
        ref={sendButton}
      >
        Send
      </button>
      <button onClick={ping}>Ping</button>
    </div>
  );
};

export default ChatInput;
