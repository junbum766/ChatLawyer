const axios = require("axios");
require("dotenv").config(); // process.env.xxx
const fs = require("fs"); // json 저장 툴

/////////////////// 링크 가져오기 ///////////////////
const apiURL = "http://www.law.go.kr/DRF/lawSearch.do";

const getData = async (pageNum) => {
  let res;
  try {
    res = await axios.get(apiURL, {
      params: {
        OC: process.env.LAW_DATA_API_KEY,
        target: "prec",
        type: "XML",
        search: 2,
        display: 50,
        page: pageNum,
        query: "임대차보호",
      },
    });
  } catch (e) {
    console.log("axios 에러 >>> ", e);
  }
  return res.data;
};

const result = async (list) => {
  for (let n = 1; n <= 14; n++) {
    // 30 page 까지 뽑아내기
    await getData(n).then((data) => {
      if (n == 1) {
        console.log("샘플데이터 확인 >>> ", data);
      }
      data = data.split("/판례상세링크>"); // str 향테로 쭉 나오기 때문에 리스트로 쪼개줌
      data.pop(); // 리스트 마지막에 필요없는 문자가 남아서 없애줌
      list.push(data);
      console.log(n, "th page data length >>> ", data.length);
    });
  }
  let cnt = 0;
  let newData = []; // 모든 데이터를 딕셔너리 형태로 다시 담아줄 리스트
  for (let i = 0; i < list.length; i++) {
    // page 수
    for (let j = 0; j < list[i].length; j++) {
      // page 당 display 수
      const linkStart = list[i][j].indexOf("<판례상세링크>") + 8;

      const nameStart = list[i][j].indexOf("CDATA") + 6;
      const nameEnd = list[i][j].indexOf("</사건명>") - 3;

      const link = list[i][j].slice(linkStart, -1);
      const name = list[i][j].slice(nameStart, nameEnd);

      const newDic = { id: cnt, name: name, link: link };

      newData = newData.concat(newDic);
      cnt++;
    }
  }
  const jsonData = JSON.stringify(newData); // json 형식으로 변환

  fs.writeFileSync("lawIndex2.json", jsonData, "utf-8"); // json 파일로 저장

  console.log("allData length >>> ", list.length);
};
const allData = [];
result(allData);