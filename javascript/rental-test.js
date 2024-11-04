const axios = require('axios');

// Azure ML 엔드포인트 URL 및 API 키
const endpointUrl = 'https://aml-lyr-uelpz.eastus.inference.ml.azure.com/score';
const apiKey = 'Rbozcoc6WMQrZvWIYEz60BQkRQKkfDCl'; // 실제 API 키로 변경하세요

// 예측할 입력 데이터 (모델에 맞게 데이터 형식을 조정하세요)
const inputData = {
  input_data: {
    columns: [
      'day',
      'mnth',
      'year',
      'season',
      'holiday',
      'weekday',
      'workingday',
      'weathersit',
      'temp',
      'atemp',
      'hum',
      'windspeed',
    ], // 모델의 피처 이름에 맞춰 수정
    index: [0, 1], // 데이터 인덱스 (하나 이상의 행을 보낼 수 있음)
    data: [
      [1, 1, 2022, 2, 0, 1, 1, 2, 0.3, 0.3, 0.3, 0.3], // 예측을 요청할 실제 데이터 값
      [1, 1, 2022, 2, 0, 1, 1, 1, 0.5, 0.3, 0.3, 0.3],
    ],
  },
};

// 요청 옵션 설정
const options = {
  method: 'POST',
  url: endpointUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`, // API 키를 Authorization 헤더에 포함
  },
  data: inputData,
};

// Axios 요청 보내기
axios(options)
  .then((response) => {
    console.log('예측 결과:', response.data);
  })
  .catch((error) => {
    console.error('오류 발생:', error);
  });
