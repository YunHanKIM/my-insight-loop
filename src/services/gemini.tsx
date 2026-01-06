import { GoogleGenerativeAI } from "@google/generative-ai";


const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getAIResponse = async (userInput: string) => {
  try {
    // 3. AI에게 보낼 프롬프트 구성
    const prompt = `
      다음 내용을 분석해서 요약해줘:
      "${userInput}"
      
      형식:
      1. 핵심 요약 (3줄 이내)
      2. 주요 키워드 3개
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI 호출 중 오류 발생:", error);
    return "요약에 실패했습니다. 다시 시도해주세요.";
  }
};