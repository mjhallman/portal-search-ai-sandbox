import { configureStore } from '@reduxjs/toolkit'
import apiDetailsReducer from "../components/api_details/apiDetailsSlice";
import { deployApi } from "./deployApi";
import {api} from "./api";

export const store = configureStore({
  reducer: {
    apiDetails: apiDetailsReducer,
    [deployApi.reducerPath]: deployApi.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(deployApi.middleware)
  .concat(api.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch