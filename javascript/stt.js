const axios = require('axios');
const fs = require('fs');

// Azure Speech 서비스 정보
const subscriptionKey = '4d4ec4a3e09a42a98c910d80db08fd50'; // Azure Portal에서 받은 API 키
const region = 'eastus'; // 예: 'eastus', 'koreacentral'
const endpoint = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US`; // 한국어 설정 (ko-KR)

// 음성 파일 경로 (WAV 파일)
const audioFilePath = './time.wav';

// 음성 파일을 읽어 API에 전송하는 함수
function convertSpeechToText() {
  // 음성 파일을 읽어서 binary 데이터로 변환
  const audioData = fs.readFileSync(audioFilePath);

  // Azure STT API 호출
  axios
    .post(endpoint, audioData, {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'audio/wav',
        'Transfer-Encoding': 'chunked',
      },
    })
    .then((response) => {
      console.log('STT Response:', response.data);
    })
    .catch((error) => {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message
      );
    });
}

// 함수 실행
convertSpeechToText();
