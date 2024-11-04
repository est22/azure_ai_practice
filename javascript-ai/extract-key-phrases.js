const axios = require("axios");
require("dotenv").config();

const endpoint = `${process.env.LANGUAGE_ENDPOINT}/text/analytics/v3.1/keyphrases`;
const apiKey = process.env.LANGUAGE_APIKEY;

const textToAnalyze = {
  documents: [
    {
      id: "1",
      language: "ko",
      text: "주차하거나 좁은 길을 지날 때 운전자를 돕는 장치들이 있다. 이 중 차량 전후좌우에 장착된 카메라로 촬영한 영상을 이용하여 차량 주위 360°의 상황을 위에서 내려다본 것 같은 영상을 만들어 차 안의 모니터를 통해 운전자에게 제공하는 장치 가 있다. 운전자에게 제공되는 영상이 어떻게 만들어지는지 알아 보자.",
    },
    {
      id: "2",
      language: "en",
      text: "Over the years, memory has been given a bad name. It has been associated with rote learning and cramming information into your brain. Educators have said that understanding is the key to learning, but how can you understand something if you can’t remember it? We have all had this experience: we recognize and understand information but can’t recall it when we need it. For example, how many jokes do you know? You’ve probably heard thousands, but you can only recall about four or five right now. ",
    },
  ],
};

const headers = {
  "Ocp-Apim-Subscription-Key": apiKey,
  "Content-Type": "application/json",
};

async function extractKeyPhrases() {
  try {
    const res = await axios.post(endpoint, textToAnalyze, {
      headers,
    });
    const documents = res.data.documents;
    documents.forEach((document) => {
      const keyPhrasesJoined = document.keyPhrases.join(", ");
      console.log(`${document.id}: ${keyPhrasesJoined}`);
    });
  } catch (error) {
    console.log("Error:", error.response ? error.response.data : error.message);
  }
}

extractKeyPhrases();
