// redux/features/chatroomSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatrooms: [
    { id: 1, name: "General" },
    { id: 2, name: "Work" },
  ],
};

const chatroomSlice = createSlice({
  name: "chatroom",
  initialState,
  reducers: {
    createChatroom: (state, action) => {
      state.chatrooms.push({
        id: Date.now(),
        name: action.payload,
      });
    },
    deleteChatroom: (state, action) => {
      state.chatrooms = state.chatrooms.filter(
        (room) => room.id !== action.payload
      );
    },
  },
});

export const { createChatroom, deleteChatroom } = chatroomSlice.actions;
export default chatroomSlice.reducer;
