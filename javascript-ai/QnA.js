const axios = require("axios");
require("dotenv").config();
const fs = require("fs");
const endpoint = `${process.env.LANGUAGE_ENDPOINT}/language/:query-knowledgebases?projectName=qna&api-version=2021-10-01&deploymentName=production`;
const apiKey = process.env.LANGUAGE_APIKEY;

const question = "how can i book a flight?"

const headers = {
  "Ocp-Apim-Subscription-Key": apiKey,
  "Content-Type": "application/json",
};

const body = {
    question: question,
    top: 3,
    confidenceScoreThreshold: 0.01
}

const option = {
    method: 'POST',
    url: endpoint,
    headers,
    data: body
}


function getAnswerfromQnA() {
    axios(option)
      .then((res) => {
        const answers = res.data.answers;
        answers.forEach((answer, index) => {
          console.log(`${index}: ${answer.answer}`);
        });
      })
      .catch((error) => {
        console.log(error);
      });

}

getAnswerfromQnA();
// console.log(endpoint);
