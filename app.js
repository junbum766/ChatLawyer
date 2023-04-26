const axios = require("axios");
const express = require("express");
const cors = require("cors");
const path = require("path");
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

require("dotenv").config();

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

/////////////////// 링크 가져오기 ///////////////////
// const apiURL = "http://www.law.go.kr/DRF/lawSearch.do";

// const getData = async (pageNum) => {
//   let res;
//   try {
//     res = await axios.get(apiURL, {
//       params: {
//         OC: "",
//         target: "prec",
//         type: "XML",
//         display: 50,
//         page: pageNum,
//         query: "부동산",
//       },
//     });
//   } catch (e) {
//     console.log("axios 에러 >>> ", e);
//   }
//   return res.data;
// };
// // 부동산법 판레는 50개씩 보면 30page까지 있음.

// app.get("/", function (req, res) {
//   const result = async (list) => {
//     for (let n = 1; n < 31; n++) {
//       // 30 page 까지 뽑아내기
//       await getData(n).then((data) => {
//         if (n == 1) {
//           console.log("샘플데이터 확인 >>> ", data);
//         }
//         data = data.split("/판례상세링크>"); // str 향테로 쭉 나오기 때문에 리스트로 쪼개줌
//         data.pop(); // 리스트 마지막에 필요없는 문자가 남아서 없애줌
//         list.push(data);
//         console.log(n, "th page data length >>> ", data.length);
//       });
//     }
//     let cnt = 0;
//     let newData = []; // 모든 데이터를 딕셔너리 형태로 다시 담아줄 리스트
//     for (let i = 0; i < list.length; i++) { // page 수
//       for (let j = 0; j < list[i].length; j++) { // page 당 display 수
//         const linkStart = list[i][j].indexOf("<판례상세링크>") + 8;

//         const nameStart = list[i][j].indexOf("CDATA") + 6;
//         const nameEnd = list[i][j].indexOf("</사건명>") - 3;

//         const link = list[i][j].slice(linkStart, -1);
//         const name = list[i][j].slice(nameStart, nameEnd);

//         const newDic = { id: cnt, name: name, link: link };

//         newData = newData.concat(newDic);
//         cnt++;
//       }
//     }
//     const fs = require("fs"); // json 저장 툴
//     const jsonData = JSON.stringify(newData); // json 형식으로 변환

//     fs.writeFileSync("lawIndex.json", jsonData, "utf-8"); // json 파일로 저장

//     console.log("allData length >>> ", list.length);
//     res.render("lawList", { data: newData });
//   };
//   const allData = [];
//   result(allData);
// });

/////////////////// 본문 가져오기 ///////////////////
// const apiURL = "http://www.law.go.kr/DRF/lawService.do"; // lawService 주의!! 목록 조회는 lawSearch임
// // "link": "/DRF/lawService.do?OC=&amp;target=prec&amp;ID=71227&amp;type=HTML&amp;mobileYn="

// const getData = async (linkID) => {
//   let res;
//   try {
//     res = await axios.get(apiURL, {
//       params: {
//         OC: "",
//         target: "prec",
//         type: "XML",
//         ID: linkID,
//       },
//     });
//   } catch (e) {
//     console.log("axios 에러 >>> ", e);
//   }
//   return res.data;
// };

// const jsonData = require("./lawIndex.json"); // 로컬 json 불러오기

// app.get("/", function (req, res) {

//   let link = jsonData[0].link;
//   let start = link.indexOf("ID=") + 3;
//   let end = link.indexOf("type") - 5;
//   let id = link.slice(start, end);
//   console.log('ID >>> ', id)

//   getData(id).then((data) => {
//     res.render("content", { data: data });
//   });
// });

http.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
