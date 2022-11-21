import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://collectionapi.metmuseum.org/public/collection/v1",
  }),
  keepUnusedDataFor: 120,
  tagTypes: ["Query", "Piece"],
  endpoints: (builder) => ({
    getSearch: builder.query({
      query: (arg) => ({
        url: "search",
        params: { ...arg },
      }),
    }),
    getObject: builder.query({
      query: (arg) => ({
        url: `objects/${arg}`,
      }),
    }),
  }),
});

export const { useGetSearchQuery, useGetObjectQuery, usePrefetch } = apiSlice;
