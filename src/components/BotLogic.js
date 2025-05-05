import chatbotData from './Data/chatbotData.json';

class BotLogic {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  sendMessage = (text) => {
    const msg = this.createChatBotMessage(text);
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, msg]
    }));
  };

  parseMessage = (message) => {
    const lower = message.toLowerCase();

    for (const key in chatbotData.general) {
      if (lower.includes(key)) {
        return this.sendMessage(chatbotData.general[key]);
      }
    }

    const courses = Object.keys(chatbotData.courses);
    const topics = ["subjects", "duration", "complexity"];

    for (const course of courses) {
      if (lower.includes(course)) {
        for (const topic of topics) {
          if (lower.includes(topic)) {
            return this.sendMessage(chatbotData.courses[course][topic]);
          }
        }
        return this.sendMessage(chatbotData.courses[course].intro);
      }
    }

    this.sendMessage("Sorry, I can't help you with that.");
  };
}

export default BotLogic;
