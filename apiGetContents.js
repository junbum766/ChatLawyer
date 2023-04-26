const axios = require("axios");
const fs = require("fs"); // json 저장 툴
require("dotenv").config(); // process.env.xxx

/////////////////// 본문 가져오기 ///////////////////
const apiURL = "http://www.law.go.kr/DRF/lawService.do"; // lawService 주의!! 목록 조회는 lawSearch임

const getData = async (linkID) => {
  let res;
  try {
    res = await axios.get(apiURL, {
      params: {
        OC: process.env.LAW_DATA_API_KEY,
        target: "prec",
        type: "XML",
        ID: linkID,
      },
    });
  } catch (e) {
    console.log("axios 에러 >>> ", e);
  }
  return res.data;
};

const getContents = async () => {
  const jsonData = require("./lawIndex2.json"); // 로컬 json 불러오기
  let fail = 0;
  let failList = [];
  for (let i = 0; i < jsonData.length; i++) {
    let link = jsonData[i].link;
    let start = link.indexOf("ID=") + 3;
    let end = link.indexOf("type") - 5;
    let id = link.slice(start, end);
    let result = await getData(id);

    let resultIndexStart = result.indexOf("<판결요지>");
    let resultIndexEnd = result.indexOf("</판결요지>");

    jsonData[i].link = id;

    let content = result.slice(resultIndexStart + 15, resultIndexEnd - 3);
    content = content.trim();

    if (content == "") {
      console.log(i, `번 >>> 판결요지 없음(id=${id})`);
      jsonData[i].contents = "";
      fail++;
      failList.push(i);
    } else {
      console.log(i, "번 완료!");
      jsonData[i].contents = content;
    }
  }
  console.log("실패 개수 = ", fail);
  console.log("실패 id = ", failList);
  // const newJsonData = JSON.stringify(jsonData); // json 형식으로 변환
  // fs.writeFileSync("lawData.json", newJsonData, "utf-8"); // json 파일로 저장
};

getContents();
