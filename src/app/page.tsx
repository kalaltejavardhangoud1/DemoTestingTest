'use client';

import { useState, useEffect } from 'react';

export default function DemoPage() {
  // Counter states
  const [counter, setCounter] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [color, setColor] = useState('blue');
  const [inputValue, setInputValue] = useState('');

  // Base64 states
  const [base64Input, setBase64Input] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');
  const [isDark, setIsDark] = useState(true);
  const [isPasting, setIsPasting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [copiedType, setCopiedType] = useState('');

  const colors = ['blue', 'green', 'red', 'purple', 'orange', 'pink'];

  // Base64 encoding/decoding effect
  useEffect(() => {
    try {
      const encodedText = btoa(base64Input);
      setEncoded(encodedText);
    } catch (e) {
      setEncoded('Invalid input for encoding');
    }

    try {
      const decodedText = atob(base64Input);
      setDecoded(decodedText);
    } catch (e) {
      setDecoded('Invalid base64 input');
    }
  }, [base64Input]);

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Copy failed. Please try again.');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setBase64Input(text);
      setIsPasting(true);
      setTimeout(() => setIsPasting(false), 500);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
      alert('Paste failed. Please copy text first.');
    }
  };

  const handleClear = () => {
    setBase64Input('');
    setIsClearing(true);
    setTimeout(() => setIsClearing(false), 300);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'
    }`}>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold mb-2">Interactive Demo Page</h1>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Test all features including counters, colors, inputs, and Base64 encoding!
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-lg transition-all transform hover:scale-105 ${
              isDark 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-white hover:bg-gray-200 shadow-lg'
            }`}
            title="Toggle Theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Counter Section */}
        <div className={`rounded-lg p-6 shadow-xl transition-colors ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className="text-2xl font-semibold mb-4">Counter Test</h2>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => setCounter(counter - 1)}
              className=""
            >
              
            </button>
            <div className="text-4xl font-bold text-blue-400 min-w-[80px] text-center">
              {counter}
            </div>
            <button
              onClick={() => setCounter(counter + 1)}
              className="bg-green hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              
            </button>
            <button
              onClick={() => setCounter(0)}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isDark 
                  ? 'bg-gray-600 hover:bg-gray-700' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Message Toggle Section */}
        <div className={`rounded-lg p-6 shadow-xl transition-colors ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className="text-2xl font-semibold mb-4">Message Toggle</h2>
          <button
            onClick={() => setShowMessage(!showMessage)}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {showMessage ? 'Hide Message' : 'Show Message'}
          </button>
          {showMessage && (
            <div className={`mt-4 p-4 rounded-lg border-2 transition-all ${
              isDark 
                ? 'bg-purple-900 border-purple-500' 
                : 'bg-purple-100 border-purple-400'
            }`}>
              <p className="text-lg">🎉 Hello! This is a test message for recording!</p>
            </div>
          )}
        </div>

        {/* Color Picker Section */}
        <div className={`rounded-lg p-6 shadow-xl transition-colors ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className="text-2xl font-semibold mb-4">Color Selector</h2>
          <div className="flex flex-wrap gap-3 mb-4">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                  color === c ? 'ring-4 ring-white' : ''
                }`}
                style={{
                  backgroundColor: c === 'blue' ? '#3b82f6' :
                                 c === 'green' ? '#10b981' :
                                 c === 'red' ? '#ef4444' :
                                 c === 'purple' ? '#8b5cf6' :
                                 c === 'orange' ? '#f97316' :
                                 '#ec4899'
                }}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
          <div 
            className="h-32 rounded-lg flex items-center justify-center text-2xl font-bold transition-all"
            style={{
              backgroundColor: color === 'blue' ? '#3b82f6' :
                             color === 'green' ? '#10b981' :
                             color === 'red' ? '#ef4444' :
                             color === 'purple' ? '#8b5cf6' :
                             color === 'orange' ? '#f97316' :
                             '#ec4899'
            }}
          >
            Selected: {color.toUpperCase()}
          </div>
        </div>

        {/* Input Test Section */}
        <div className={`rounded-lg p-6 shadow-xl transition-colors ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className="text-2xl font-semibold mb-4">Input Test</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type something here..."
              className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors ${
                isDark 
                  ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500' 
                  : 'bg-gray-50 text-gray-900 border-gray-300 focus:border-blue-500'
              }`}
            />
            {inputValue && (
              <div className={`p-4 rounded-lg transition-all ${
                isDark ? 'bg-blue-900' : 'bg-blue-100'
              }`}>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  You typed:
                </p>
                <p className="text-xl font-semibold">{inputValue}</p>
              </div>
            )}
            <button
              onClick={() => setInputValue('')}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Clear Input
            </button>
          </div>
        </div>

        {/* Base64 Encoder/Decoder Section */}
        <div className={`rounded-lg p-6 shadow-xl transition-colors ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className="text-2xl font-semibold mb-4">Base64 Encoder/Decoder</h2>
          <div className="space-y-6">
            <div className="relative">
              <textarea
                value={base64Input}
                onChange={(e) => setBase64Input(e.target.value)}
                placeholder="Enter text to encode/decode..."
                className={`w-full h-32 p-4 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors ${
                  isDark 
                    ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-500' 
                    : 'bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-400'
                }`}
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={handlePaste}
                  disabled={isPasting}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-gray-600 hover:bg-gray-700' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  title="Paste from clipboard"
                >
                  📋
                </button>
                <button
                  onClick={handleClear}
                  disabled={isClearing}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-gray-600 hover:bg-gray-700' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  title="Clear input"
                >
                  ✖️
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Encoded</h3>
                <div className="relative">
                  <div className={`w-full min-h-[100px] p-4 rounded-lg border-2 break-all transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-gray-50 border-gray-300'
                  }`}>
                    {encoded}
                  </div>
                  <button
                    onClick={() => handleCopy(encoded, 'encoded')}
                    className={`absolute top-2 right-2 p-2 rounded-lg transition-all ${
                      isDark 
                        ? 'bg-gray-600 hover:bg-gray-700' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    } ${copiedType === 'encoded' ? 'scale-110' : ''}`}
                    title="Copy encoded text"
                  >
                    {copiedType === 'encoded' ? '✅' : '📄'}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Decoded</h3>
                <div className="relative">
                  <div className={`w-full min-h-[100px] p-4 rounded-lg border-2 break-all transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-gray-50 border-gray-300'
                  }`}>
                    {decoded}
                  </div>
                  <button
                    onClick={() => handleCopy(decoded, 'decoded')}
                    className={`absolute top-2 right-2 p-2 rounded-lg transition-all ${
                      isDark 
                        ? 'bg-gray-600 hover:bg-gray-700' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    } ${copiedType === 'decoded' ? 'scale-110' : ''}`}
                    title="Copy decoded text"
                  >
                    {copiedType === 'decoded' ? '✅' : '📄'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className={`rounded-lg p-6 shadow-xl transition-colors ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => alert('Button 1 clicked!')}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-lg font-semibold transition-colors"
            >
              Action 1
            </button>
            <button 
              onClick={() => alert('Button 2 clicked!')}
              className="bg-green-600 hover:bg-green-700 px-6 py-4 rounded-lg font-semibold transition-colors"
            >
              Action 2
            </button>
            <button 
              onClick={() => alert('Button 3 clicked!')}
              className="bg-yellow-600 hover:bg-yellow-700 px-6 py-4 rounded-lg font-semibold transition-colors"
            >
              Action 3
            </button>
            <button 
              onClick={() => alert('Button 4 clicked!')}
              className="bg-red-600 hover:bg-red-700 px-6 py-4 rounded-lg font-semibold transition-colors"
            >
              Action 4
            </button>
            <button 
              onClick={() => alert('Button 5 clicked!')}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-4 rounded-lg font-semibold transition-colors"
            >
              Action 5
            </button>
            <button 
              onClick={() => alert('Button 6 clicked!')}
              className="bg-pink-600 hover:bg-pink-700 px-6 py-4 rounded-lg font-semibold transition-colors"
            >
              Action 6
            </button>
            <button 
              onClick={() => alert('Button 7 clicked!')}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-4 rounded-lg font-semibold transition-colors"
            >
              Action 7
            </button>
            <button 
              onClick={() => alert('Button 8 clicked!')}
              className="bg-teal-600 hover:bg-teal-700 px-6 py-4 rounded-lg font-semibold transition-colors"
            >
              Action 8
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className={`rounded-lg p-6 shadow-xl border-2 transition-colors ${
          isDark 
            ? 'bg-gray-800 border-blue-500' 
            : 'bg-white border-blue-400'
        }`}>
          <h2 className="text-2xl font-semibold mb-4">📹 Testing Instructions</h2>
          <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <li>✅ Toggle between light and dark themes</li>
            <li>✅ Use the counter (increase/decrease/reset)</li>
            <li>✅ Toggle the message on and off</li>
            <li>✅ Select different colors and see the preview</li>
            <li>✅ Type in the input field and clear it</li>
            <li>✅ Test Base64 encoding and decoding</li>
            <li>✅ Copy encoded/decoded text</li>
            <li>✅ Click the action buttons</li>
            <li>✅ Scroll up and down the page</li>
            <li>✅ Spend 2-3 minutes interacting with all features</li>
          </ul>
        </div>

      </div>
    </div>
  );
}