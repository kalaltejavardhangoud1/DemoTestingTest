'use client'

import { useState, useEffect } from 'react';
import { FiCopy, FiSun, FiMoon, FiClipboard, FiX } from 'react-icons/fi';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true; // default to dark if no preference
  }
  return true; // default to dark on server-side
};

export default function Home() {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [isPasting, setIsPasting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    try {
      const encodedText = btoa(input);
      setEncoded(encodedText);
    } catch (e) {
      setEncoded('Invalid input for encoding');
    }

    try {
      const decodedText = atob(input);
      setDecoded(decodedText);
    } catch (e) {
      setDecoded('Invalid base64 input');
    }
  }, [input]);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      setIsPasting(true);
      setTimeout(() => setIsPasting(false), 500);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleClear = () => {
    setInput('');
    setIsClearing(true);
    setTimeout(() => setIsClearing(false), 300);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 bg-grid-pattern p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Base64 Encoder/Decoder
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to encode/decode..."
              className="w-full h-40 p-4 rounded-lg bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={handlePaste}
                disabled={isPasting}
                className="p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <FiClipboard className={`w-5 h-5 ${isPasting ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleClear}
                disabled={isClearing}
                className="p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <FiX className={`w-5 h-5 ${isClearing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Encoded</h2>
              <div className="relative">
                <div className="w-full min-h-[100px] p-4 rounded-lg bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 break-all">
                  {encoded}
                </div>
                <button
                  onClick={() => handleCopy(encoded)}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <FiCopy className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Decoded</h2>
              <div className="relative">
                <div className="w-full min-h-[100px] p-4 rounded-lg bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 break-all">
                  {decoded}
                </div>
                <button
                  onClick={() => handleCopy(decoded)}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <FiCopy className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
