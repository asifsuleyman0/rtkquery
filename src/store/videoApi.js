import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const videoApi = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backlify-v2.onrender.com",
  }),
  tagTypes: ["Video"],
  endpoints: (builder) => ({
    // 🔹 Videoların siyahısı
    getVideos: builder.query({
      query: () => "/video/list",
      transformResponse: (response) =>
        response.data?.videos || response.content || response || [],
      providesTags: ["Video"],
    }),

    // 🔹 Yeni video yüklə
    createVideo: builder.mutation({
      query: (formData) => ({
        url: "/video/upload",
        method: "POST",
        body: formData, // FormData ilə göndərilir
      }),
      invalidatesTags: ["Video"],
    }),

    // 🔹 Video məlumatlarını yenilə (title/desc və s.)
    updateVideo: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/video/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Video"],
    }),

    // 🔹 Video sil
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/video/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Video"],
    }),

    // 🔹 Tək video haqqında info
    getVideoInfo: builder.query({
      query: (id) => `/video/${id}/info`,
      providesTags: ["Video"],
    }),

    // 🔹 Statistikalar
    getVideoStats: builder.query({
      query: () => "/video/stats",
      providesTags: ["Video"],
    }),
  }),
});

// RTK Hooks
export const {
  useGetVideosQuery,
  useCreateVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  useGetVideoInfoQuery,
  useGetVideoStatsQuery,
} = videoApi;
