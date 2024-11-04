const axios = require('axios');

// Azure Text Analytics 서비스 정보
const subscriptionKey = 'b1626d93b66d47ab9d43b1464c96ce04'; // Azure Portal에서 받은 API Key
const endpoint = `https://azls-lyr.cognitiveservices.azure.com/text/analytics/v3.1/entities/recognition/general`;

// 분석할 텍스트 데이터
const textToAnalyze = {
  documents: [
    {
      id: '1',
      language: 'ko', // 텍스트의 언어 (한국어)
      text: 'Azure는 Microsoft가 제공하는 클라우드 플랫폼으로, 전 세계적으로 사용됩니다.',
    },
  ],
};

// 엔터티 추출 함수
async function extractEntities() {
  try {
    const response = await axios.post(endpoint, textToAnalyze, {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/json',
      },
    });

    // 엔터티 추출 결과 출력
    const entities = response.data.documents[0].entities;
    console.log('추출된 엔터티:');
    entities.forEach((entity) => {
      console.log(
        `텍스트: ${entity.text}, 카테고리: ${entity.category}, 신뢰도: ${entity.confidenceScore}`
      );
    });
  } catch (error) {
    console.error(
      '엔터티 추출 중 오류 발생:',
      error.response ? error.response.data : error.message
    );
  }
}
// 함수 실행
extractEntities();
