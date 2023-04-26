const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config(); // process.env.xxx

const configuration = new Configuration({
  apiKey: process.env.CHATGPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

const main = async (messages, userMsg) => {
  messages.push({ role: "user", content: userMsg });

  res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  ans = res.data.choices[0].message.content;

  messages.push({ role: "assistant", content: ans });

  console.log("함수 내부", messages, ans);

  return ans;
};

module.exports = main;
