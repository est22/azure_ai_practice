const axios = require('axios');
const fs = require('fs');

// Azure Document Intelligence 서비스 정보
const subscriptionKey = '96993810cf0b49fa80135cde6a7a077b'; // Azure Portal에서 받은 API Key
const region = 'eastus2'; // 예: 'eastus', 'westeurope', 'koreacentral'
const endpoint = `https://${region}.api.cognitive.microsoft.com/formrecognizer/documentModels/prebuilt-document:analyze?api-version=2023-07-31`;

// 분석할 파일 경로
const filePath = './receipt.jpg'; // 분석할 PDF 또는 이미지 파일 경로

// 문서 분석 요청 보내기
async function analyzeDocument() {
  try {
    // 파일을 읽어 binary 데이터로 변환
    const fileData = fs.readFileSync(filePath);

    // 분석 요청 보내기
    const response = await axios.post(endpoint, fileData, {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        // 'Content-Type': 'application/pdf', // PDF 파일의 경우
        'Content-Type': 'image/jpeg', // JPEG 파일의 경우
        'Content-Length': fileData.length,
      },
    });

    // 분석 요청의 상태를 확인할 수 있는 Operation-Location URL 받기
    const operationLocation = response.headers['operation-location'];
    console.log('Operation-Location:', operationLocation);

    // 일정 시간 대기 후 결과 확인
    setTimeout(() => getAnalysisResult(operationLocation), 5000); // 5초 후에 결과 요청
  } catch (error) {
    console.error(
      'Error sending document for analysis:',
      error.response ? error.response.data : error.message
    );
  }
}

// 분석 결과를 가져오기 위한 GET 요청
async function getAnalysisResult(operationLocation) {
  try {
    // Operation-Location URL을 사용하여 분석 결과 요청
    const resultResponse = await axios.get(operationLocation, {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
    });
    // 분석 결과 출력
    const keyValuePairs = resultResponse.data.analyzeResult.keyValuePairs;
    console.log(keyValuePairs);

    // 각 필드를 key-value 형태로 출력

    keyValuePairs.forEach((pair) => {
      console.log(`${pair.key.content}: ${pair.value.content}`);
    });
  } catch (error) {
    console.error(
      'Error retrieving analysis result:',
      error.response ? error.response.data : error.message
    );
  }
}

// 문서 분석 함수 실행
analyzeDocument();
