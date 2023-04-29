import os
import sys
import urllib.request
import json

with open("../lawListNew.json", "r") as f:
    json_data = json.load(f)

client_id = ""  # 개발자센터에서 발급받은 Client ID 값
client_secret = ""  # 개발자센터에서 발급받은 Client Secret 값

newJson = json_data

for i in range(25):
    query = json_data[i]["조문내용"]
    encText = urllib.parse.quote(query)
    data = "source=ko&target=en&text=" + encText
    url = "https://openapi.naver.com/v1/papago/n2mt"
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id", client_id)
    request.add_header("X-Naver-Client-Secret", client_secret)
    response = urllib.request.urlopen(request, data=data.encode("utf-8"))
    rescode = response.getcode()
    if rescode == 200:
        response_body = response.read()
        json_object = json.loads(response_body.decode("utf-8"))
        content = json_object["message"]["result"]["translatedText"]
        print(content)
        newJson[i]["조문내용"] = content
    else:
        print("Error Code:" + rescode)

with open("./englishLawListNew.json", "w", encoding="UTF-8") as outfile:
    json.dump(newJson, outfile, ensure_ascii=False)
