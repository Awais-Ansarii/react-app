import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("bookmark") || "[]");

export const bookmarkSlide = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      console.log(action.payload);
      if (state.includes(action.payload)) return;
      state.push(parseInt(action.payload));
      localStorage.setItem("bookmark", JSON.stringify(state));
    },
    removeBookmark: (state, action) => {
      const index = state.indexOf(parseInt(action.payload));
      if (index > -1) {
        // only splice array when item is found
        state.splice(index, 1); // 2nd parameter means remove one item only
      }
      localStorage.setItem("bookmark", JSON.stringify(state));
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlide.actions;
export default bookmarkSlide.reducer;
