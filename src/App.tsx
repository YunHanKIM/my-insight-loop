import { useState } from 'react'
import { getAIResponse } from './services/gemini'
import './App.css'

function App() {
const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!input) return;
    
    setIsLoading(true);
    const response = await getAIResponse(input);
    setResult(response);
    setIsLoading(false);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">InsightLoop 요약 테스트</h1>
      <textarea 
        className="w-full p-4 border rounded-md"
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="요약할 내용을 입력하세요..."
      />
      <button 
        onClick={handleAnalyze}
        disabled={isLoading}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
      >
        {isLoading ? '분석 중...' : '요약하기'}
      </button>
      
      {result && (
        <div className="mt-10 p-6 bg-gray-100 rounded-md whitespace-pre-wrap">
          <h2 className="font-bold mb-2">분석 결과:</h2>
          {result}
        </div>
      )}
    </div>
  );
}

export default App
