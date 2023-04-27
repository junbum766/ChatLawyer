from kobert_tokenizer import KoBERTTokenizer
import torch
from torch import nn
from transformers import BertModel

tokenizer = KoBERTTokenizer.from_pretrained("skt/kobert-base-v1")
model = BertModel.from_pretrained("skt/kobert-base-v1")
# tokenizer = KoBERTTokenizer.from_pretrained("skt/kogpt2-base-v2")
# model = BertModel.from_pretrained("skt/kogpt2-base-v2")

query = "전세 임대차보호법에 따른 수리 및 보증금 반환 문의"

text1 = "부동산임의경매"
text2 = "건물인도"
text3 = "소유권이전등기"
text4 = "취득세등추징부과처분등취소"
text5 = "손해배상"


q_inputs = tokenizer.batch_encode_plus([query])
q_out = model(
    input_ids=torch.tensor(q_inputs["input_ids"]),
    attention_mask=torch.tensor(q_inputs["attention_mask"]),
)
q_result = q_out.pooler_output


inputs1 = tokenizer.batch_encode_plus([text1])
out1 = model(
    input_ids=torch.tensor(inputs1["input_ids"]),
    attention_mask=torch.tensor(inputs1["attention_mask"]),
)
result1 = out1.pooler_output

inputs2 = tokenizer.batch_encode_plus([text2])
out2 = model(
    input_ids=torch.tensor(inputs2["input_ids"]),
    attention_mask=torch.tensor(inputs2["attention_mask"]),
)
result2 = out2.pooler_output

inputs3 = tokenizer.batch_encode_plus([text3])
out3 = model(
    input_ids=torch.tensor(inputs3["input_ids"]),
    attention_mask=torch.tensor(inputs3["attention_mask"]),
)
result3 = out3.pooler_output

inputs4 = tokenizer.batch_encode_plus([text4])
out4 = model(
    input_ids=torch.tensor(inputs4["input_ids"]),
    attention_mask=torch.tensor(inputs4["attention_mask"]),
)
result4 = out4.pooler_output

inputs5 = tokenizer.batch_encode_plus([text5])
out5 = model(
    input_ids=torch.tensor(inputs5["input_ids"]),
    attention_mask=torch.tensor(inputs5["attention_mask"]),
)
result5 = out5.pooler_output


cos = nn.CosineSimilarity(dim=1)

print('-------------- cosine smilarity --------------')
print("q and 1 : ", cos(q_result, result1))
print("q and 2 : ", cos(q_result, result2))
print("q and 3 : ", cos(q_result, result3))
print("q and 4 : ", cos(q_result, result4))
print("q and 5 : ", cos(q_result, result5))

# a = cos(q_result, result1)
# a = a.tolist()[0]
# print(a+2)