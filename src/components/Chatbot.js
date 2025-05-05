import React from 'react';
import { Chatbot as ReactChatbot } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

import config from './config';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';

const Chatbot = () => {
  return (
    <div style={{ maxWidth: "300px"}}>
      <ReactChatbot 
        config={config} 
        actionProvider={ActionProvider} 
        messageParser={MessageParser} 
      />
    </div>
  );
};

export default Chatbot;
