import BotLogic from './BotLogic';

const config = {
  initialMessages: [
    {
      type: 'text',
      id: 1,
      message: "Hi! How can I help you today?"
    }
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
  customActionProvider: BotLogic
};

export default config;
