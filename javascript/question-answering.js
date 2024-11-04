const axios = require('axios');

// Azure Question Answering API 엔드포인트와 API 키 설정
const endpoint =
  'https://azls-lyr.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=MargiesTravel&api-version=2021-10-01&deploymentName=production';
const apiKey = 'b1626d93b66d47ab9d43b1464c96ce04';

// 사용자 질문
const question = 'How can I book a flight?';

// 요청 데이터 구성
const requestBody = {
  question: question,
  top: 3, // 가장 관련성 높은 상위 3개의 답변을 요청
  confidenceScoreThreshold: 0.3, // 최소 신뢰 점수
  includeUnstructuredSources: true, // 비구조화된 소스도 포함
};

// 요청 옵션 설정
const options = {
  method: 'POST',
  url: `${endpoint}`,
  headers: {
    'Ocp-Apim-Subscription-Key': apiKey,
    'Content-Type': 'application/json',
  },
  data: requestBody,
};

// Question Answering API 호출
axios(options)
  .then((response) => {
    const answers = response.data.answers;
    answers.forEach((answer, index) => {
      console.log(
        `Answer ${index + 1}: ${answer.answer} (Confidence: ${
          answer.confidenceScore
        })`
      );
    });
  })
  .catch((error) => {
    console.error(
      'Error:',
      error.response ? error.response.data : error.message
    );
  });
