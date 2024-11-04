const axios = require('axios');
const fs = require('fs');
const text =
  '안녕하세요, Azure 텍스트 음성 변환 서비스를 사용해 주셔서 감사합니다.';
// Azure Speech 서비스 정보
const subscriptionKey = '4d4ec4a3e09a42a98c910d80db08fd50'; // Azure Portal에서 받은 API 키
const region = 'eastus'; // 예: 'eastus', 'koreacentral'
const endpoint = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;

// SSML 구조를 사용하여 변환할 텍스트 정의
const ssml = `
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="ko-KR">
    <voice name="ko-KR-SunHiNeural">
        ${text}
    </voice>
</speak>`;

// TTS 요청을 보내고, 결과를 오디오 파일로 저장하는 함수
function convertTextToSpeech() {
  axios
    .post(endpoint, ssml, {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'riff-16khz-16bit-mono-pcm', // 오디오 형식 (WAV)
      },
      responseType: 'arraybuffer', // 응답을 바이너리 데이터로 받음
    })
    .then((response) => {
      // 음성 데이터를 파일로 저장
      fs.writeFileSync('output.wav', response.data);
      console.log('TTS 음성 파일이 성공적으로 저장되었습니다.');
    })
    .catch((error) => {
      console.error(
        'TTS 요청 중 오류 발생:',
        error.response ? error.response.data : error.message
      );
    });
}

// 함수 실행
convertTextToSpeech();
