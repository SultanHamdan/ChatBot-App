import { createChatBotMessage } from "react-chatbot-kit";
import BotLogic from "../Logic/BotLogic";
import Avatar from "../BotAvatar/Avatar";
const config = {
  initialMessages: [
    createChatBotMessage("Hii! Explorer!"),
    createChatBotMessage("I'm Your Support Bot!"),
    createChatBotMessage("I'm trained to help you learn and figure out stuff your looking for."),
    createChatBotMessage("So what can I help you with. 😊")
  ],
  state: {},
  customComponents: {
    botAvatar: (props) => <Avatar/>
  },
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
