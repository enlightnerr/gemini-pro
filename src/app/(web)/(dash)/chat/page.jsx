"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlinePaperClip } from "react-icons/hi";
import {
  loadMoreMessages,
  sendMessage,
  receiveAIMessage,
} from "@/redux/features/chatSlice";
import toast, { Toaster } from "react-hot-toast";
import { FaCopy } from "react-icons/fa6";

export default function ChatUI() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [input, setInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    dispatch(loadMoreMessages());
  }, [dispatch]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleScroll = () => {
    if (containerRef.current.scrollTop === 0) {
      dispatch(loadMoreMessages());
    }
  };

  const handleSend = () => {
    if (!input.trim() && !imagePreview) return;

    const message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      image: imagePreview,
      timestamp: new Date().toISOString(),
    };
    dispatch(sendMessage(message));
    setInput("");
    setImagePreview(null);

    setIsTyping(true);
    setTimeout(() => {
      dispatch(
        receiveAIMessage({
          id: Date.now().toString(),
          sender: "ai",
          text: "This is Gemini's versatile response",
          timestamp: new Date().toISOString(),
        })
      );
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // simulate "thinking"
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Message copied to clipboard!");
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="p-4 border-b border-gray-700 text-lg font-bold bg-black">
        Gemini Chat
      </div>

      {/* Chat Window */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-2"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="relative group max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl bg-gray-800 text-sm">
              {msg.text && <p>{msg.text}</p>}

              {msg.image && (
                <img
                  src={msg.image}
                  alt="uploaded"
                  className="mt-2 rounded-lg max-w-full max-h-40"
                />
              )}

              <span className="text-xs text-gray-400 block mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>

              {/* Copy Icon */}
              {msg.text && (
                <button
                  onClick={() => handleCopy(msg.text)}
                  className="absolute top-1 right-2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Copy message"
                >
                  <FaCopy />
                </button>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="text-sm text-gray-400 animate-pulse">
            Gemini is typing...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700 bg-black flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded bg-gray-800 text-white placeholder-gray-400 text-sm focus:outline-none"
        />
        <label htmlFor="file-upload">
          <HiOutlinePaperClip />
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={handleImageUpload}
          className="text-xs text-gray-400"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}
