const axios = require('axios');
const fs = require('fs');

// Azure Face API 엔드포인트 및 API 키 설정
const endpoint = 'https://ais-lyr.cognitiveservices.azure.com/face/v1.0/detect';
const apiKey = '0253b2beeacf48489d7d6b163d58a776'; // Azure Portal에서 받은 API 키

// 분석할 이미지의 파일 경로 (로컬 파일 시스템에서)
const imagePath = './store-camera-1.jpg';

// 이미지 파일을 읽어서 바이너리 데이터로 준비
const imageBuffer = fs.readFileSync(imagePath);

// Face API 요청 옵션 설정
const options = {
  method: 'POST',
  url: endpoint,
  params: {
    returnFaceLandmarks: true,
    returnFaceAttributes: 'glasses,accessories,blur,exposure,noise', // 얼굴 속성 요청
  },
  headers: {
    'Content-Type': 'application/octet-stream', // 바이너리 데이터를 보낼 때 사용
    'Ocp-Apim-Subscription-Key': apiKey, // API 키를 설정
  },
  data: imageBuffer, // 이미지 데이터 전송
};

// Azure Face API 호출
axios(options)
  .then((response) => {
    console.log('Face attributes detected:', response.data);
  })
  .catch((error) => {
    console.error(
      'Error:',
      error.response ? error.response.data : error.message
    );
  });
