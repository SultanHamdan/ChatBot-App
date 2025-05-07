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

  formatResponse = (response, topic) => {
    if (typeof response === "string") {
      return response;
    } else if (typeof response === "object" && response !== null) {
      if (topic === "complexity") {
        return `Level: ${response.level}\nReason: ${response.reason}\nTips:\n- ${response.tips.join("\n- ")}`;
      } else if (topic === "career_prospects") {
        return Object.entries(response)
          .map(([field, info]) => {
            return `${field.toUpperCase()}:\n  Roles: ${info.roles.join(", ")}\n  Skills: ${info.skills_required.join(", ")}`;
          })
          .join("\n\n");
      } else if (topic === "specializations" && Array.isArray(response)) {
        return `Specializations:\n- ${response.join("\n- ")}`;
      } else {
        return JSON.stringify(response, null, 2);
      }
    } else {
      return "Sorry, I couldn't understand the data.";
    }
  };

  parseMessage = (message) => {
    const lower = message.toLowerCase();

    // This section is to check the general 
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

    const mentionedSection = sectionNames.find((section) =>
      lower.includes(section)
    );
    const mentionedTopic = topics.find((topic) => lower.includes(topic));

    this.setState((prev) => {
      let currentTopic = prev.currentTopic;

      if (mentionedSection) {
        currentTopic = mentionedSection;
      }

      if (mentionedSection && mentionedTopic) {
        const response = sections[currentTopic][mentionedTopic];
        return {
          ...prev,
          currentTopic,
          messages: [
            ...prev.messages,
            this.createChatBotMessage(this.formatResponse(response, mentionedTopic)),
          ],
        };
      }

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

      if (mentionedTopic && currentTopic && sections[currentTopic]) {
        const response = sections[currentTopic][mentionedTopic];
        return {
          ...prev,
          messages: [
            ...prev.messages,
            this.createChatBotMessage(this.formatResponse(response, mentionedTopic)),
          ],
        };
      }

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
