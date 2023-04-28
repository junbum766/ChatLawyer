const axios = require("axios");
const fs = require("fs"); // json 저장 툴
require("dotenv").config(); // process.env.xxx

/////////////////// 판례 본문 가져오기 ///////////////////
// const apiURL = "http://www.law.go.kr/DRF/lawService.do"; // lawService 주의!! 목록 조회는 lawSearch임

// const getData = async (linkID) => {
//   let res;
//   try {
//     res = await axios.get(apiURL, {
//       params: {
//         OC: process.env.LAW_DATA_API_KEY,
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

// const getContents = async () => {
//   const jsonData = require("./lawIndex2.json"); // 로컬 json 불러오기
//   let fail = 0;
//   let failList = [];
//   for (let i = 0; i < jsonData.length; i++) {
//     let link = jsonData[i].link;
//     let start = link.indexOf("ID=") + 3;
//     let end = link.indexOf("type") - 5;
//     let id = link.slice(start, end);
//     let result = await getData(id);

//     let resultIndexStart = result.indexOf("<판결요지>");
//     let resultIndexEnd = result.indexOf("</판결요지>");

//     jsonData[i].link = id;

//     let content = result.slice(resultIndexStart + 15, resultIndexEnd - 3);
//     content = content.trim();

//     if (content == "") {
//       console.log(i, `번 >>> 판결요지 없음(id=${id})`);
//       jsonData[i].contents = "";
//       fail++;
//       failList.push(i);
//     } else {
//       console.log(i, "번 완료!");
//       jsonData[i].contents = content;
//     }
//   }
//   console.log("실패 개수 = ", fail);
//   console.log("실패 id = ", failList);
//   // const newJsonData = JSON.stringify(jsonData); // json 형식으로 변환
//   // fs.writeFileSync("lawData.json", newJsonData, "utf-8"); // json 파일로 저장
// };

// getContents();

/////////////////// 법령 본문 xml to json ///////////////////
// const xml2js = require("xml2js");
// const parser = new xml2js.Parser();
// const apiURL = "http://www.law.go.kr/DRF/lawService.do";

// const getData = async () => {
//   let res;
//   try {
//     res = await axios.get(apiURL, {
//       params: {
//         OC: process.env.LAW_DATA_API_KEY,
//         target: "law",
//         type: "XML",
//         MST: 246231,
//       },
//     });
//   } catch (e) {
//     console.log("axios 에러 >>> ", e);
//   }
//   return res.data;
// };
// const getContents = async () => {
//   // const jsonData = require("./lawIndex2.json"); // 로컬 json 불러오기

//   let result = await getData();

//   parser.parseStringPromise(result).then(function (result) {
//     const json = JSON.stringify(result);
//     fs.writeFileSync("enforceLawList.json", json, "utf-8"); // json 파일로 저장
//   });
//   // const newJsonData = JSON.stringify(jsonData); // json 형식으로 변환
// };
// getContents();

///////////// lawList json 보기 쉽게 ////////////
const apiURL = "http://www.law.go.kr/DRF/lawService.do";

const getContents = async () => {
  let jsonData = require("./enforceLawList.json"); // 로컬 json 불러오기

  jsonData = jsonData["법령"]["조문"][0]["조문단위"];

  let result = [];

  for (let i = 0; i < jsonData.length; i++) {
    data = jsonData[i];
    let dict = {};
    let keys = Object.keys(data);
    if (keys.includes("항")) {
      let text = data["조문내용"][0];
      for (let hang of data["항"]) {
        if (hang["항내용"]) {
          text += hang["항내용"][0].trim();
        }
        let hangKeys = Object.keys(hang);
        if (hangKeys.includes("호")) {
          for (let ho of hang["호"]) {
            text += ho["호내용"][0].trim();
          }
        }
      }
      dict["id"] = String(i+32); ///////
      dict["조문번호"] = data["조문번호"][0];
      if (data["조문가지번호"] != undefined) {
        dict["조문가지번호"] = data["조문가지번호"][0];
      }
      dict["조문내용"] = text;
      result.push(dict);
    } else {
      dict["id"] = String(i+32); /////
      dict["조문번호"] = data["조문번호"][0];
      if (data["조문가지번호"] != undefined) {
        dict["조문가지번호"] = data["조문가지번호"][0];
      }
      dict["조문내용"] = data["조문내용"][0];
      result.push(dict);
    }
  }

  console.log(result);

  result = JSON.stringify(result); // json 형식으로 변환
  fs.writeFileSync("enforcelawListNew.json", result, "utf-8"); // json 파일로 저장
};

getContents();
