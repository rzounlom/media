import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { faker } from "@faker-js/faker";

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    fetchFunc: async (...args) => {
      await pause(2000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, album) => {
          const tags = result.map((photo) => ({ type: "Photo", id: photo.id }));
          tags.push({ type: "AlbumPhoto", id: album.id });

          return tags;
        },
        query: (album) => {
          return {
            url: `/photos`,
            params: { albumId: album.id },
            method: "GET",
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, album) => [
          { type: "AlbumPhoto", id: album.id },
        ],
        query: (album) => {
          return {
            url: `/photos`,
            params: { albumId: album.id },
            method: "POST",
            body: {
              albumId: album.id,
              url: faker.image.abstract(150, 150, true),
            },
          };
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => [
          { type: "Photo", id: photo.id },
        ],
        query: (photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;
