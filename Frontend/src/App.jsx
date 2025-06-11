import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [jokes, setjokes] = useState([]);
  
  useEffect(() => {
    async function Getdata() {
      // Proxy configuration allows frontend to make requests to backend server
      // When you configure proxy in package.json or vite.config.js, 
      // requests to /api/* get forwarded to your backend server
      // This avoids CORS issues during development
      let res = await axios.get("/api/jokes");
      setjokes(res.data);
    }
    Getdata();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            My React Jokes App
          </h1>
          <div className="inline-block bg-white rounded-full px-6 py-2 shadow-md">
            <h3 className="text-lg md:text-xl font-semibold text-indigo-600">
              Total Jokes: {jokes.length}
            </h3>
          </div>
        </div>

        {/* Jokes Grid */}
        <div className="grid gap-6 md:gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {jokes.map((joke) => (
            <div
              key={joke.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 leading-tight">
                {joke.title}
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {joke.content}
              </p>
            </div>
          ))}
        </div>

        {/* Loading/Empty State */}
        {jokes.length === 0 && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading jokes...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;