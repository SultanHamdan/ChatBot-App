import chatbotData from '../Data/chatbotData.json';

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
  
    // Checks if the user’s message includes any key from the "general" section of the JSON 
    if (chatbotData.general) {
      for (const key in chatbotData.general) {
        if (lower.includes(key)) {
          return this.sendMessage(chatbotData.general[key]);
        }
      }
    }
  
    const mainKey = Object.keys(chatbotData).find(key => key !== "general");
    const sections = chatbotData[mainKey];
    if (!sections) return this.sendMessage("Sorry, I couldn't find the data.");
  
    const sectionNames = Object.keys(sections);
    const topics = Array.from(
      new Set(
        sectionNames.flatMap(name => Object.keys(sections[name]))
      )
    ).filter(topic => topic !== "intro");
  
    // First check if a section was mentioned
    for (const section of sectionNames) {
      if (lower.includes(section)) {
        this.setState((prev) => ({
          ...prev,
          currentTopic: section,
          messages: [...prev.messages, this.createChatBotMessage(sections[section].intro)]
        }));
        return;
      }
    }
  
    // Now use currentTopic from state
    this.setState((prev) => {
      const currentTopic = prev.currentTopic;
      if (currentTopic && sections[currentTopic]) {
        for (const topic of topics) {
          if (lower.includes(topic)) {
            return {
              ...prev,
              messages: [...prev.messages, this.createChatBotMessage(sections[currentTopic][topic])]
            };
          }
        }
      }
  

      return {
        ...prev,
        messages: [...prev.messages, this.createChatBotMessage("Sorry, I can't help you with that.")]
      };
    });
  };
  
}

export default BotLogic;
