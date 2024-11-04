const axios = require("axios");
require("dotenv").config();
const fs = require("fs");

const endpoint = `${process.env.STT_ENDPOINT}/speech/recognition/conversation/cognitiveservices/v1?language=ko-KR`;
const apiKey = process.env.SPEECH_APIKEY;
const audioFilePath = "./output.wav";

const headers = {
  "Ocp-Apim-Subscription-Key": apiKey,
  "Content-Type": "application/octet-stream",
  "Transfer-Encoding": "chunked",
};

function convertSpeechToText() {
  // 음성 파일 읽어서 binary 데이터로 변환
  const audioData = fs.readFileSync(audioFilePath);

  axios
    .post(endpoint, audioData, {
      headers,
    })
    .then((res) => {
      console.log("STT Response: ", res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

convertSpeechToText();
// console.log(endpoint);
