import { albumsApi } from "./apis/albumsApi";
import { configureStore } from "@reduxjs/toolkit";
import { photosApi } from "./apis/photosApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersReducer } from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware),
});

setupListeners(store.dispatch);

export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/deleteUser";
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from "./apis/albumsApi";

export {
  useAddPhotoMutation,
  useFetchPhotosQuery,
  useRemovePhotoMutation,
} from "./apis/photosApi";
