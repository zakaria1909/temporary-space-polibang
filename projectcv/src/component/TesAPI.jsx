// component/TestAPI.jsx
import React, { useState } from "react";

export default function TestAPI() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testAPI = async (url) => {
    setLoading(true);
    setResult('Testing...');
    
    try {
      console.log('Testing URL:', url);
      const response = await fetch(url);
      
      let resultText = `
URL: ${url}
Status: ${response.status}
OK: ${response.ok}
Status Text: ${response.statusText}
Content-Type: ${response.headers.get('content-type')}
      `;
      
      if (response.ok) {
        const data = await response.json();
        resultText += '\n\nData:\n' + JSON.stringify(data, null, 2);
        
        // Jika ini adalah root API, coba test semua endpoint yang ditemukan
        if (typeof data === 'object' && !Array.isArray(data)) {
          resultText += '\n\n🔍 Found endpoints, testing each one...\n';
          
          for (const [key, endpointUrl] of Object.entries(data)) {
            if (typeof endpointUrl === 'string' && endpointUrl.startsWith('http')) {
              try {
                const endpointResponse = await fetch(endpointUrl);
                resultText += `\n${key}: ${endpointResponse.status} ${endpointResponse.ok ? '✅' : '❌'}`;
                
                if (endpointResponse.ok) {
                  const endpointData = await endpointResponse.json();
                  resultText += ` (${Array.isArray(endpointData) ? endpointData.length + ' items' : 'object'})`;
                }
              } catch (err) {
                resultText += `\n${key}: ❌ Error - ${err.message}`;
              }
            }
          }
        }
        
        setResult(resultText);
      } else {
        setResult(resultText + '\n\nResponse not OK');
      }
    } catch (error) {
      setResult(`Error: ${error.message}\nURL: ${url}`);
    } finally {
      setLoading(false);
    }
  };

  const urls = [
    // Port 80 (default)
    'http://192.168.21.64/api/educations/',
    'http://192.168.21.64/cv-api/educations/',
    'http://192.168.21.64/api/',
    'http://192.168.21.64/cv-api/',
    
    // Port 8000 (Django default)
    'http://192.168.21.64:8000/api/educations/',
    'http://192.168.21.64:8000/cv-api/educations/',
    'http://192.168.21.64:8000/api/',
    'http://192.168.21.64:8000/cv-api/',
    
    // Port 8080
    'http://192.168.21.64:8080/api/educations/',
    'http://192.168.21.64:8080/cv-api/educations/',
    
    // Django admin port (jika berbeda)
    'http://192.168.21.64:3000/api/educations/',
    'http://192.168.21.64:5000/api/educations/',
  ];

  return (
    <div className="flex-1 bg-white p-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">API Tester</h2>
      
      <div className="space-y-2 mb-4">
        {urls.map((url) => (
          <button
            key={url}
            onClick={() => testAPI(url)}
            disabled={loading}
            className="block w-full text-left p-2 bg-teal-100 hover:bg-teal-200 rounded text-sm"
          >
            Test: {url}
          </button>
        ))}
      </div>

      <div className="bg-gray-100 p-4 rounded min-h-40">
        <h3 className="font-bold mb-2">Result:</h3>
        <pre className="text-xs whitespace-pre-wrap">{result || 'Click a button to test API'}</pre>
      </div>
    </div>
  );
}