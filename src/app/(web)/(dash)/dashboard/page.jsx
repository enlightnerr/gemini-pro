"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChatroom, deleteChatroom } from "@/redux/features/chatroomSlice";
import toast, { Toaster } from "react-hot-toast";
import { FaTrash, FaPlus } from "react-icons/fa";

export default function DashboardPage() {
  const user = useSelector((state) => state.auth.user);
  const chatrooms = useSelector((state) => state.chatroom.chatrooms);
  const dispatch = useDispatch();

  const [newChatroom, setNewChatroom] = useState("");

  const handleCreate = () => {
    if (!newChatroom.trim()) {
      toast.error("Chatroom name can't be empty.");
      return;
    }

    dispatch(createChatroom(newChatroom.trim()));
    toast.success(`Chatroom "${newChatroom}" created.`);
    setNewChatroom("");
  };

  const handleDelete = (id) => {
    const room = chatrooms.find((r) => r.id === id);
    dispatch(deleteChatroom(id));
    toast.success(`Chatroom "${room.name}" deleted.`);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Toaster position="top-right" />
      <header className="p-4 border-b border-gray-700 bg-black">
        <h1 className="text-xl font-bold">
          Welcome{user ? `, ${user.name}` : ""}
        </h1>
        {user && (
          <p className="text-sm text-gray-400">Logged in as {user.phone}</p>
        )}
      </header>

      <main className="flex-1 p-4 overflow-y-auto space-y-4">
        <h2 className="text-lg font-semibold">Your Chatrooms</h2>

        <ul className="space-y-2">
          {chatrooms.map((room) => (
            <li
              key={room.id}
              className="flex justify-between items-center bg-gray-800 p-3 rounded-md"
            >
              <span>{room.name}</span>
              <button
                onClick={() => handleDelete(room.id)}
                className="text-red-400 hover:text-red-600 transition"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <h3 className="text-md font-medium mb-2">Create a new chatroom</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newChatroom}
              onChange={(e) => setNewChatroom(e.target.value)}
              placeholder="Chatroom name"
              className="flex-1 p-2 rounded bg-gray-700 text-white placeholder-gray-400 text-sm focus:outline-none"
            />
            <button
              onClick={handleCreate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded flex items-center gap-1"
            >
              <FaPlus />
              <span className="hidden sm:inline">Create</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
