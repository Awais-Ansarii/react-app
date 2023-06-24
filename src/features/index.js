import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./bookmark-slice";
const store = configureStore({
  reducer: {
    bookmarks: bookmarkReducer,
  },
});

export default store;
