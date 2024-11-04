const axios = require('axios');

// Azure Translator 서비스 정보
const subscriptionKey = '7f0ea6bcbfe6415bbae2379136d835af'; // Azure Portal에서 받은 API 키
const region = 'eastus'; // 예: 'eastus', 'westeurope', 'koreacentral'
const endpoint =
  'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en'; // 목표 언어는 영어 (en)

// 번역할 텍스트
const textToTranslate = [{ Text: '안녕하세요, 어떻게 도와드릴까요?' }];

// Azure Translator API 호출 함수
async function translateText() {
  try {
    const response = await axios.post(endpoint, textToTranslate, {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region': region,
        'Content-Type': 'application/json',
      },
    });

    // 번역 결과 출력
    console.log('번역 결과:', response.data);
  } catch (error) {
    console.error(
      'Error:',
      error.response ? error.response.data : error.message
    );
  }
}

// 함수 실행
translateText();
