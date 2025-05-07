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
      messages: [...prev.messages, msg],
    }));
  };

  parseMessage = (message) => {
    const lower = message.toLowerCase();

    // Check general section
    if (chatbotData.general) {
      for (const key in chatbotData.general) {
        if (lower.includes(key)) {
          return this.sendMessage(chatbotData.general[key]);
        }
      }
    }

    // Identify the main key (excluding 'general')
    const mainKey = Object.keys(chatbotData).find((key) => key !== 'general');
    const sections = chatbotData[mainKey];
    if (!sections) return this.sendMessage("Sorry, I couldn't find the data.");

    const sectionNames = Object.keys(sections);
    const topics = Array.from(
      new Set(sectionNames.flatMap((name) => Object.keys(sections[name])))
    ).filter((topic) => topic !== 'intro');

    // Determine if any section is mentioned in the message
    const mentionedSection = sectionNames.find((section) =>
      lower.includes(section)
    );

    // Determine if any topic is mentioned in the message
    const mentionedTopic = topics.find((topic) => lower.includes(topic));

    // Update state based on identified section and topic
    this.setState((prev) => {
      let currentTopic = prev.currentTopic;

      // If a new section is mentioned, update currentTopic
      if (mentionedSection) {
        currentTopic = mentionedSection;
      }

      // If both section and topic are mentioned
      if (mentionedSection && mentionedTopic) {
        return {
          ...prev,
          currentTopic,
          messages: [
            ...prev.messages,
            this.createChatBotMessage(sections[currentTopic][mentionedTopic]),
          ],
        };
      }

      // If only section is mentioned
      if (mentionedSection) {
        return {
          ...prev,
          currentTopic,
          messages: [
            ...prev.messages,
            this.createChatBotMessage(sections[currentTopic].intro),
          ],
        };
      }

      // If only topic is mentioned and currentTopic is set
      if (mentionedTopic && currentTopic && sections[currentTopic]) {
        return {
          ...prev,
          messages: [
            ...prev.messages,
            this.createChatBotMessage(sections[currentTopic][mentionedTopic]),
          ],
        };
      }

      // If neither section nor topic is mentioned
      return {
        ...prev,
        messages: [
          ...prev.messages,
          this.createChatBotMessage("Sorry, I can't help you with that."),
        ],
      };
    });
  };
}

export default BotLogic;
