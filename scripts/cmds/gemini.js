const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get(
    "https://raw.githubusercontent.com/nazrul4x/Noobs/main/Apis.json"
  );
  return base.data.api;
};


module.exports = {
  config: {
    name: "gemini",
    version: "1.0",
    author: "♡ Nazrul ♡",
    countDown: 5,
    description: " Google ai assistant ",
    role: 0,
    category: "ai",
    guide: {
    en: "{p}{n} prompt"
  }
  },

  onStart: async function({ message, event, args, commandName, usersData }) {
    const prompt = args.join(' ');
    const data = await usersData.get(event.senderID);
    const name = data.name || "Darling";
    try {
      const response = await axios.get(`${await baseApiUrl()}/nazrul/gemini?prompt=${encodeURIComponent(prompt)}`);

      if (response.data) {
        const responseMsg = response.data.nazrul;
        const responseBody = `Hey ${name} ♡\n🪄 ${responseMsg}`;
        message.reply({
          body: responseBody,
        }, (err, info) => {
          if (err) return console.error("Reply error:", err);
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID
          });
        });
      }

    } catch (error) {
      console.error("Request error:", error.message);
    }
  },

  onReply: async function({ message, event, Reply, args }) {
    let { author, commandName } = Reply;
    if (event.senderID !== author) return;

    const prompt = args.join(' ');
    const senderName = message.senderName;

    try {
      const response = await axios.get(`${await baseApiUrl()}/nazrul/gemini?prompt=${encodeURIComponent(prompt)}`);

      if (response.data) {
        const responseMsg = response.data.nazrul;
        const responseBody = `🪄 ${responseMsg}`;
        message.reply({
          body: responseBody,
        }, (err, info) => {
          if (err) return console.error("Reply error:", err);
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID
          });
        });
      }

    } catch (error) {
      console.error("Request error:", error.message);
    }
  }
};
