const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config(); // process.env.xxx

const configuration = new Configuration({
  apiKey: process.env.CHATGPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

const main = async (messages, userMsg, lawList, lawIndex) => {
  for (let i = 0; i < lawList.length; i++) {
    messages.push({ role: "user", content: `${lawIndex[i]} : ${lawList[i]}` });
  }
  messages.push({
    role: "user",
    content: `${userMsg}\n 위 다섯 개의 법 조항들을 적절히 참고해서 이 질문에 3문장 이내로 명료하게 답변해줘.`,
  });
  res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  console.log("ChatGPT Prompt >>> ", messages);

  ans = res.data.choices[0].message.content;

  messages.push({ role: "assistant", content: ans });

  return ans;
};

module.exports = main;
