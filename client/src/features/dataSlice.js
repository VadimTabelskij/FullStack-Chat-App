import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    myUser: null,
    allUsers: [],
    isLoggedIn: false,
    currentUser: null,
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setUser: (state, action) => {
      const { secret, username, imageUrl } = action.payload;
      state.myUser = { secret, username };
      state.currentUser = { secret, username, imageUrl };
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.myUser = null;
      state.isLoggedIn = false;
    },
    deleteConversation: (state, action) => {
      const conversationId = action.payload;
      state.allUsers.forEach((user) => {
        (user.conversations.filter((conversation) => conversation._id !== conversationId));
      });
    },
  },
});

export const { setAllUsers, 
  setUser,
   clearUser, deleteConversation } = dataSlice.actions;

export default dataSlice.reducer;
