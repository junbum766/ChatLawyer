const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);
const fs = require("fs"); // json 불러오기 위함
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "http://www.law.go.kr/DRF/lawSearch.do",
};
app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/static"));
app.use(cors());

// json
const jsonFile = fs.readFileSync("./lawListNewVector.json", "utf8");
const jsonData = JSON.parse(jsonFile);

//파이썬 모듈 불러오기 위함
const spawn = require("child_process").spawn;

const getSimilarity = (query) => {
  const result_02 = spawn("python", ["sbert.py", query]);
  return new Promise((resolve) => {
    result_02.stdout.on("data", (data) => {
      console.log("진행중...");
      let topSimilarity = data.toString();
      topSimilarity = topSimilarity.slice(1, topSimilarity.length - 2);
      let topSimilarityList = topSimilarity.split(",");
      topSimilarityList.map((el) => {
        return el.trim();
      });
      resolve(topSimilarityList);
    });
  });
};
//

require("dotenv").config(); // process.env.xxx

let main = require("./chatGPT.js"); // Gpt 불러옴

const messages = [
  {
    role: "system",
    content:
      "You are a helpful real estate lawyer. If a user has a legal question, please kindly consult.",
  },
];

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/gpt", function (req, res) {
  res.render("gpt");
});

app.get("/gpt/gptAxios", async (req, res) => {
  query = req.query.questionData; // 질문을 받아옴
  console.log("질문: ", query);
  const sim = await getSimilarity(query); // 질문과 판례의 유사도를 측정, top5의 id를 불러옴
  console.log("similarity ID >>> ", sim);
  let lawList = [];
  for (let num of sim) {
    // top5 id에 대응하는 판결요지문을 가져와서 빈 리스트에 넣어줌
    lawList.push(jsonData[Number(num)]["조문내용"]);
  }
  const answer = await main(messages, query, lawList); // 질문이 gpt에 들어가고, 대답이 나옴
  console.log("대답: ", answer);

  res.send(answer); // 대답을 뿌려줌
});

http.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
