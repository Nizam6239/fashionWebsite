"use client";
import { useState, useEffect } from "react";
import image1 from "../../../public/xmark.png";
import image2 from "../../../public/image.png"
import Image from "next/image";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const chatContainer = document.querySelector("#chat-container");
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }, [messages, isOpen]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command: userMessage.trim().toLowerCase() }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch chatbot response");
      }
      const data = await response.json();
      const botMessage = data.Response || data.botMessage;

      setMessages((prevMessages) => [
        ...prevMessages,
        { user: userMessage, bot: botMessage },
      ]);
      setUserMessage("");
    } catch (err) {
      console.error("Error fetching chatbot response:", err);
      setError("Failed to communicate with the chatbot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!isOpen && (
        <button
          onClick={toggleChatbot}
          className="fixed bottom-5 right-5 p-3 bg-blue-600 text-white rounded-md shadow-lg z-50"
        >
          💬
        </button>
      )}
      {isOpen && (
        <div className="fixed bottom-5 right-5 w-80 bg-white rounded-xl shadow-lg z-50">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-xl">
            <h2 className="text-lg">ChatBot</h2>
            <button type="button" title="close" onClick={toggleChatbot} className="text-xl font-bold">
              <Image src={image1} alt="close" width={14} height={14} />
            </button>
          </div>
          <div
            id="chat-container"
            className="p-3 h-64 overflow-y-auto"
          >
            {messages.map((message, index) => (
              <div key={index} className="mb-4">
                <div className="text-right">
                  <p className="bg-blue-500 text-white p-2 rounded-2xl inline-block">
                    {message.user}
                  </p>
                </div>
                <div className="text-left mt-2">
                  <p className="bg-gray-200 text-black p-2 rounded-lg inline-block">
                    {message.bot}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-1 my-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-400" />
            </div>
            )}
          </div>

          <div className="p-3 border-t">
            <div className="flex">
              <input
                type="text"
                placeholder="Type your message"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                className="text-black flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300"
              />
              <button
                onClick={handleSendMessage}
                disabled={loading}
                className="p-2 bg-blue-600 text-white rounded-r-lg"
              >
                Send
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
