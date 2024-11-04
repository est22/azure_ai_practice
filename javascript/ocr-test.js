const axios = require('axios');

// Azure Computer Vision API 엔드포인트 및 API 키 설정
const endpoint = 'https://ais-lyr.cognitiveservices.azure.com/vision/v3.2/ocr';
const apiKey = '0253b2beeacf48489d7d6b163d58a776'; // Azure Portal에서 발급된 API 키

// 분석할 이미지의 URL
const imageUrl = 'https://shorturl.at/QPe3q';

// 요청 옵션 설정
const options = {
  method: 'POST',
  url: endpoint,
  params: {
    language: 'unk', // 언어를 자동으로 감지 ('unk'는 언어 미지정)
    detectOrientation: 'true', // 텍스트 방향 감지
  },
  headers: {
    'Ocp-Apim-Subscription-Key': apiKey,
    'Content-Type': 'application/json',
  },
  data: {
    url: imageUrl, // 분석할 이미지의 URL을 요청 데이터로 전달
  },
};

// Computer Vision API 호출
axios(options)
  .then((response) => {
    // OCR 결과 처리
    const regions = response.data.regions;
    if (regions.length > 0) {
      regions.forEach((region) => {
        region.lines.forEach((line) => {
          const words = line.words.map((word) => word.text).join(' ');
          console.log('Extracted text:', words);
        });
      });
    } else {
      console.log('No text found in the image.');
    }
  })
  .catch((error) => {
    console.error(
      'Error:',
      error.response ? error.response.data : error.message
    );
  });
