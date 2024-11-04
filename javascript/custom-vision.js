const axios = require('axios');

// Azure Custom Vision API 엔드포인트와 Prediction-Key 설정
const endpoint =
  'https://ais-lyr.cognitiveservices.azure.com/customvision/v3.0/Prediction/a51b6df5-2dca-4da4-802e-855c86150281/classify/iterations/animals/url';
const predictionKey = '0253b2beeacf48489d7d6b163d58a776';

// 분석할 이미지의 URL
const imageUrl =
  'https://dimg.donga.com/wps/NEWS/IMAGE/2022/09/01/115259050.2.jpg'; // 여기에 이미지 URL을 넣으세요

// 요청 옵션 설정
const options = {
  method: 'POST',
  url: endpoint,
  headers: {
    'Prediction-Key': predictionKey,
    'Content-Type': 'application/json',
  },
  data: {
    Url: imageUrl, // 이미지 URL을 API에 전달
  },
};

// Custom Vision API 호출
axios(options)
  .then((response) => {
    console.log('Prediction results:', response.data);
  })
  .catch((error) => {
    console.error(
      'Error:',
      error.response ? error.response.data : error.message
    );
  });
