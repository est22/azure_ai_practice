const axios = require('axios');
const fs = require('fs');
// Azure Computer Vision API 엔드포인트 및 API 키 설정
const endpoint =
  'https://ais-lyr.cognitiveservices.azure.com/vision/v3.2/analyze';
const apiKey = '0253b2beeacf48489d7d6b163d58a776'; // Azure Portal에서 발급된 API 키

// 분석할 이미지의 URL
// 분석할 이미지의 파일 경로 (로컬 파일 시스템에서)
const imagePath = './store-camera-1.jpg';

// 이미지 파일을 읽어서 바이너리 데이터로 준비
const imageBuffer = fs.readFileSync(imagePath);

// 요청 옵션 설정
const options = {
  method: 'POST',
  url: endpoint,
  params: {
    visualFeatures: 'Description', // 이미지의 캡션을 얻기 위한 visualFeatures 파라미터
  },
  headers: {
    'Ocp-Apim-Subscription-Key': apiKey,
    'Content-Type': 'application/octet-stream',
  },
  data: imageBuffer,
};

// Computer Vision API 호출
axios(options)
  .then((response) => {
    const captions = response.data.description.captions;
    if (captions.length > 0) {
      console.log('Image caption:', captions[0].text); // 첫 번째 캡션 출력
      console.log('Confidence:', captions[0].confidence); // 캡션의 신뢰도 출력
    } else {
      console.log('No caption found.');
    }
  })
  .catch((error) => {
    console.error(
      'Error:',
      error.response ? error.response.data : error.message
    );
  });
