const { configureStore } = require("@reduxjs/toolkit");
import authReducer from "@/redux/features/authSlice";
import chatReducer from "@/redux/features/chatSlice";
import countryReducer from "@/redux/features/countrySlice";
import chatroomReducer from "@/redux/features/chatroomSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    country: countryReducer,
    chatroom: chatroomReducer,
  },
});
