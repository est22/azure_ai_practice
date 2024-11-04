const axios = require("axios");
require("dotenv").config();
// process.env.LANGUAGE_APIKEY;
// process.env.LANGUAGE_ENDPOINT;

const endpoint = `${process.env.LANGUAGE_ENDPOINT}/text/analytics/v3.1/sentiment`;
const apiKey = process.env.LANGUAGE_APIKEY;

const textToAnalyze = {
  documents: [
    {
      id: "1",
      language: "ko",
      text: "오늘 하루 너무 즐거웠어요! 거리가 너무 예뻐요.",
    },
    {
      id: "2",
      language: "ko",
      text: "자동차가 지나갑니다.",
    },
    {
      id: "3",
      language: "ko",
      text: "오늘 하루 너무 슬퍼요!",
    },
    {
      id: "4",
      language: "en",
      text: "It's sunny day!",
    },
  ],
};

const headers = {
  "Ocp-Apim-Subscription-Key": apiKey,
  "Content-Type": "application/json",
};

async function extractSentiment() {
  try {
    const res = await axios.post(endpoint, textToAnalyze, {
      headers,
    });
    const documents = res.data.documents;
    documents.forEach((document) => {
      console.log(`${document.id}:${document.sentiment}`);
    });
  } catch (error) {
    console.log("Error:", error.response ? error.response.data : error.message);
  }
}

extractSentiment();
