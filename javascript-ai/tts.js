const axios = require("axios");
require("dotenv").config();
const fs = require("fs");

const endpoint = `${process.env.TTS_ENDPOINT}/cognitiveservices/v1`;
const apiKey = process.env.SPEECH_APIKEY;
const text = `‘김건희 여사 공천 개입 의혹’ 핵심 당사자인 명태균씨는 4일 더불어민주당이 윤석열 대통령과 자신간 녹취 파일을 추가 공개한 것과 관련해 "민주당은 대통령·영부인 추가 녹취가 없다. 국민을 상대로 사기 치지 마라"고 주장했다.`;

const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="ko-KR">
<voice name="ko-KR-InJoonNeural">
    ${text}
</voice>
</speak>`;

const headers = {
  "Ocp-Apim-Subscription-Key": apiKey,
  "Content-Type": "application/ssml+xml",
  "X-Microsoft-OutputFormat": "riff-16khz-16bit-mono-pcm",
};

axios
  .post(endpoint, ssml, {
    headers,
    responseType: "arraybuffer",
  })
  .then((res) => {
    fs.writeFileSync("./output.wav", res.data);
  })
  .catch((error) => {
    console.log(error);
  });
