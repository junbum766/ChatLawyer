const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config(); // process.env.xxx

const configuration = new Configuration({
  apiKey: process.env.CHATGPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

const main = async (messages, userMsg, lawList, lawIndex) => {
  let text = "";
  for (let i = 0; i < lawList.length; i++) {
    text += `
    ${lawIndex[i]} : ${lawList[i]}
    `
  }
  messages.push({
    role: "user",
    content: `다음 지시에 따라서 질문에 친절하고 명료하게 답변을 해줘.
    1. 다음 대괄호 안의 질문을 분석해줘.
    [${userMsg}]
    2. 다음 법 조항들을 참고해서 분석한 질문에 답변을 3문장 이내로 해줘.
    [${text}]`,
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
