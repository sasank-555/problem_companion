import React, { useState, useEffect } from "react";

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [isKeySet, setIsKeySet] = useState(false);

  useEffect(() => {
    chrome.storage.local.get("apiKey", (result) => {
      if (result.apiKey) {
        setApiKey(result.apiKey);
        setIsKeySet(true);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    chrome.storage.local.set({ apiKey }, () => {
      setIsKeySet(true);
      alert("API Key saved!");
    });
  };

  const handleChangeApiKey = () => {
    setApiKey("");
    setIsKeySet(false);
    chrome.storage.local.remove("apiKey");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          API Key Management
        </h1>
        {!isKeySet ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="apiKey"
                className="block text-sm font-medium text-gray-700"
              >
                API Key
              </label>
              <input
                type="text"
                id="apiKey"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API Key"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600"
            >
              Save API Key
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="mb-4">Your current API Key is set.</p>
            <button
              onClick={handleChangeApiKey}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
              Change API Key
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
