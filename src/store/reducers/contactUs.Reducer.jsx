import { createSlice } from "@reduxjs/toolkit";

const contactUsInitialState = {
  username: "",
  email: "",
  message: "",
  isFormValid: false,
};

const contactUsSlice = createSlice({
  name: "contactUs",
  initialState: contactUsInitialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    setIsFormValid(state, action) {
      state.isFormValid = action.payload;
    },
  },
});

export const { setUsername, setEmail, setMessage, setIsFormValid } =
  contactUsSlice.actions;

export default contactUsSlice.reducer;
