import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { faker } from "@faker-js/faker";

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    fetchFunc: async (...args) => {
      await pause(2000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => [
          { type: "Album", id: user.id },
        ],
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      fetchAlbums: builder.query({
        providesTags: (result, error, user) => [{ type: "Album", id: user.id }],
        query: (user) => {
          return {
            url: `/albums`,
            params: { userId: user.id },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
