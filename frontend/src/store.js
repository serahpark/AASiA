import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/postReducer";
import userReducer from "./reducers/userReducer"

// defines the store for the app, aka the elements of the app that have state/are modified by specific actions
// must import individual reducers that correspond to each slice of state

const store = configureStore({
  reducer: {
    posts: postReducer,
    user: userReducer
  }
})

export default store