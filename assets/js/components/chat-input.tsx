import React from 'react';

interface ChatInputProps {
    channel: Channel
}

const ChatInput: React.FunctionComponent<ChatInputProps> = (props) => {
    const { channel } = props;
    const send = async () => {
        await channel.push('new_msg', {
            body: 'Hello'
        });
    }
    const ping = async () => {
        await channel.push('ping', {
            body: 'Ping!'
        });
    }
    return (
    <div>
        <textarea/>
        <button onClick={send}>Send</button>
        <button onClick={ping}>Ping</button>
    </div>);
};

export default ChatInput;