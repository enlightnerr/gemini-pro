// redux/features/chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  hasMore: true,
  page: 1,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    loadMoreMessages: (state) => {
      const olderMessages = Array.from({ length: 20 }).map((_, i) => ({
        id: `old-${Date.now()}-${i}`,
        sender: i % 2 === 0 ? "ai" : "user",
        text: `Old message ${i + 1}`,
        timestamp: new Date(Date.now() - i * 60000).toISOString(),
      }));
      state.messages = [...olderMessages, ...state.messages];
      state.page += 1;
    },
    sendMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    receiveAIMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { loadMoreMessages, sendMessage, receiveAIMessage } =
  chatSlice.actions;
export default chatSlice.reducer;
