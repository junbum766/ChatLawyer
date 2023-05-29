# ChatLawyer
## 1. 설명
#### chatGPT를 이용한 상가임대차보호법 관련 볍률 상담 웹 서비스 입니다.
## 2. 실행 화면
### - client 화면
### <img src="https://github.com/junbum766/ChatLawyer/blob/main/images/client.png?raw=true"></img>
### - sever console 화면
### <img src="https://github.com/junbum766/ChatLawyer/blob/main/images/server.png?raw=true"></img>
#### 질문과 유사한 법안 5가지를 뽑아서 ChatGPT에 질문과함께 프롬프트로 넣어준다.
## 3. 알고리즘
### <img src="https://github.com/junbum766/ChatLawyer/blob/main/images/overview.png?raw=true"></img>
## 4. 문제점
#### 아무것도 하지 않은 GPT에 비해 괜찮은 성능을 보이지만, 실제로 사용하기에는 매우 부족하다.
#### 질문에 필요한 법조항을 올바르게 잘 뽑아내지 못하는게 가장 큰 단점인 것 같다.
## 5. 개선할 점
### 1) 판례 추가
#### - 법적인 해석에는 법 조항 뿐만 아니라, 판례도 매우 중요한 역할을 하므로 이를 프롬프트로 추가할 수 있어야 할 것 같다.
### 2) fine tuning
#### - 변호사와 상담자의 질문 대답을 가지고 모델을 파인튜닝 할 수 있다면 더욱 좋은 성능을 기대할 수 있을 것이다.
#### - 물론 chatGPT는 파인튜닝은 지원하지 않기 때문에 불가능하지만, 다른 성능 좋은 오픈 소스 모델을 활용하여 도전 해보고 싶다.
### 3) Lang Chain
#### - 뒤늦게 발견해서 적용하지 못했는데, lang chain 이라는 모듈을 통해 프롬프트를 좀 더 효율적으로 뽑아내고 관리할 수 있을 것 같다.
