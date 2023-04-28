import torch
from torch import nn
from sentence_transformers import SentenceTransformer, util
import json

with open("../lawListNew.json", "r") as f:
    json_data = json.load(f)

# print(json_data[140]['contents'])

# model = SentenceTransformer("jhgan/ko-sbert-multitask")
model = SentenceTransformer("jhgan/ko-sroberta-multitask")

print("...시작!")

for i in range(len(json_data)):
    query = json_data[i]["조문내용"]

    if query == "":  # contents가 비었으면 
        arr = [0 for _ in range(768)] # 빈 배열 할당
        print(i, "번째 = 빈 배열")
    else:  # contents가 있으면 모델에 넣어서 임베딩 벡터 할당
        q_result = model.encode(query)
        arr = q_result.tolist()  # 리스트로 바꿔서 저장
        print(i, "번째 = 성공!!!")

    json_data[i]["vector"] = arr

with open("./lawListNewVectorSroberta.json", "w", encoding="UTF-8") as outfile:
    json.dump(json_data, outfile, ensure_ascii=False)

print("...완료!")
