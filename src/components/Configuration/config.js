import { createChatBotMessage } from "react-chatbot-kit";
import BotLogic from "../Logic/BotLogic";

const config = {
  initialMessages: [
    createChatBotMessage("Hi! How can I help you today?")  
  ],
  state: {},
  customComponents: {},
  customStyles: {},
  widgets: [],
  customMessageParser: class {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }

    parse(message) {
      this.actionProvider.parseMessage(message);
    }
  },
  customActionProvider: BotLogic,
};

export default config;
