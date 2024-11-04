const axios = require('axios');

// Azure CLU API 엔드포인트와 Subscription Key 설정
const endpoint =
  'https://azls-lyr.cognitiveservices.azure.com/language/:analyze-conversations?api-version=2022-10-01-preview';
const subscriptionKey = 'b1626d93b66d47ab9d43b1464c96ce04';

// 분석할 대화 데이터 (JSON Body)
const conversationData = {
  kind: 'Conversation',
  analysisInput: {
    conversationItem: {
      id: 'unique-conversation-id',
      text: 'Turn on the lights',
      modality: 'text',
      language: 'en',
      participantId: 'user123',
    },
  },
  parameters: {
    projectName: 'clu-lyr',
    verbose: true,
    deploymentName: 'home-auto',
    stringIndexType: 'TextElement_V8',
  },
};

// axios로 API 호출 (Promise 기반)
function analyzeConversation() {
  return axios.post(endpoint, conversationData, {
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Content-Type': 'application/json',
    },
  });
}

// Promise 체인을 사용해 호출 및 결과 처리
analyzeConversation()
  .then((response) => {
    // 응답 데이터 처리
    console.log('Response from CLU:', response.data);
  })
  .catch((error) => {
    // 오류 처리
    console.error(
      'Error:',
      error.response ? error.response.data : error.message
    );
  });
