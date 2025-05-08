import React from 'react';
import { Chatbot as ReactChatbot } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from '../Configuration/config';
import './Chatbot.css'

const Chatbot = () => {
  
  return (

    <>
    <ReactChatbot 
        config={config} 
        actionProvider={config.customActionProvider} 
        messageParser={config.customMessageParser} 
      />
    </>
  );
};

export default Chatbot;
