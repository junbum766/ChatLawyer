import torch
from torch import nn
from sentence_transformers import SentenceTransformer
import json
import sys


def sbert(query):
    with open("./lawListNewVector.json", "r", encoding="utf-8") as f:
        json_data = json.load(f)
    # print(len(json_data))  ###
    model = SentenceTransformer("jhgan/ko-sbert-multitask")

    cos = nn.CosineSimilarity(dim=0)

    similatiyList = []

    queryVector = model.encode(query)
    queryVector = torch.tensor(queryVector)

    for i in range(len(json_data)):
        # print(i, "번째 검사...") ###
        jsonVector = json_data[i]["vector"]
        jsonVector = torch.tensor(jsonVector)

        similatiy = cos(queryVector, jsonVector)
        # print(similatiy) ###
        similatiy = similatiy.tolist()
        # print(similatiy) ###
        similatiyList.append({"id": i, "similatiy": similatiy})

    listDesc = sorted(similatiyList, key=lambda x: x["similatiy"], reverse=True)

    result = listDesc[0:5]  # top5 유사도만
    # result = filter(lambda x: x["similatiy"] > 0.6, listDesc)  # 0.6 보다 유사도가 높은 법들만 뽑음
    # result = list(result)
    # print(result)

    topLaw = [el["id"] for el in result]  # 유사도 높은 순서대로 id 출력

    print(topLaw)


# def hello(a):
#     print(a)


if __name__ == "__main__":
    sbert(sys.argv[1])
    # sbert("""""")
