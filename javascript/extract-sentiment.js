const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

// Azure Text Analytics 서비스 정보
const subscriptionKey = process.env.LANGUAGE_APIKEY; // Azure Portal에서 받은 API Key
const endpoint = `${process.env.LANGUAGE_ENDPOINT}/text/analytics/v3.1/sentiment`;

// 추출할 텍스트 데이터
const textToAnalyze = {
  documents: [
    {
      id: '1',
      language: 'ko',
      text: '오늘 하루 너무 즐거웠어요! 거리가 너무 예뻐요.',
    },
    {
      id: '2',
      language: 'ko',
      text: '자동차가 지나갑니다.',
    },
    {
      id: '3',
      language: 'ko',
      text: '오늘 하루 너무 슬퍼요!',
    },
    {
      id: '4',
      language: 'en',
      text: "It's sunny day!",
    },
  ],
};

async function extractSentiment() {
  try {
    const response = await axios.post(endpoint, textToAnalyze, {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/json',
      },
    });

    const documents = response.data.documents;
    documents.forEach((document) => {
      console.log(`${document.id}:${document.sentiment}`);
    });
  } catch (error) {
    console.error(
      'Error extracting sentiment:',
      error.response ? error.response.data : error.message
    );
  }
}

// 함수 실행
extractSentiment();
