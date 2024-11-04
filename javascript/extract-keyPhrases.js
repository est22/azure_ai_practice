const axios = require('axios');

// Azure Text Analytics 서비스 정보
const subscriptionKey = 'b1626d93b66d47ab9d43b1464c96ce04'; // Azure Portal에서 받은 API Key
// const region = 'YOUR_REGION'; // 예: 'eastus', 'westeurope', 'koreacentral'
const endpoint = `https://azls-lyr.cognitiveservices.azure.com/text/analytics/v3.1/keyPhrases`;

// 추출할 텍스트 데이터
const textToAnalyze = {
  documents: [
    {
      id: '1',
      language: 'ko', // 텍스트의 언어 (한국어)
      text: 'Azure Text Analytics 서비스는 텍스트에서 중요한 정보를 추출하는 데 매우 유용합니다.',
    },
  ],
};

// 핵심구 추출 함수
async function extractKeyPhrases() {
  try {
    const response = await axios.post(endpoint, textToAnalyze, {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/json',
      },
    });

    // 추출된 핵심구 출력
    const keyPhrases = response.data.documents[0].keyPhrases;
    console.log('추출된 핵심구:', keyPhrases);
  } catch (error) {
    console.error(
      'Error extracting key phrases:',
      error.response ? error.response.data : error.message
    );
  }
}

// 함수 실행
extractKeyPhrases();
