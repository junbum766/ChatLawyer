const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config(); // process.env.xxx

const configuration = new Configuration({
  apiKey: process.env.CHATGPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

const main = async (messages, userMsg, lawList) => {
  for (let i = 0; i < lawList.length; i++) {
    messages.push({ role: "user", content: `판례 ${i+1} : ${lawList[i]}` });
  }
  messages.push({
    role: "user",
    content: `${userMsg}\n이 질문에 대답하기 위해서, 위에 세 개의 판례들을 참고해서 세 문장 이내로 답변해줘.`,
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
