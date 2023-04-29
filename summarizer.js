const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config(); // process.env.xxx

const configuration = new Configuration({
  apiKey: process.env.CHATGPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

const summarizer = async (query) => {
  res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `${query}
          위 질문의 핵심만 추려서 한 문장으로 요약해줘.`,
      },
    ],
  });
  ans = res.data.choices[0].message.content;
  return ans;
};

module.exports = summarizer;
