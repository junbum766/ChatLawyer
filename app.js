const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "http://www.law.go.kr/DRF/lawSearch.do",
};
app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/static"));
app.use(cors());

require("dotenv").config(); // process.env.xxx

let main = require("./chatGPT.js"); // Gpt 불러옴

const messages = [{ role: "system", content: "You are a helpful assistant." }];

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/gpt", function (req, res) {
  res.render("gpt");
});

app.get("/gpt/gptAxios", async (req, res) => {
  data = req.query.questionData;
  console.log("질문: ", data);
  const answer = await main(messages, data);
  console.log("대답: ", answer);
  res.send(answer);
});

http.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
