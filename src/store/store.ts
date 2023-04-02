import { configureStore } from '@reduxjs/toolkit'
import apiDetailsReducer from "../components/api_details/apiDetailsSlice";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    apiDetails: apiDetailsReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch