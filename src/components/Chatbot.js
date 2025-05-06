import React from 'react';
import { Chatbot as ReactChatbot } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

import config from './config';

const Chatbot = () => {
  return (
    <div style={{ maxWidth: "300px" }}>
      <ReactChatbot 
        config={config} 
        actionProvider={config.customActionProvider} 
        messageParser={config.customMessageParser} 
      />
    </div>
  );
};

export default Chatbot;
