import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://digacc-5.onrender.com/api" }),
  tagTypes: ["Course", "Teacher", "User", "News", "Video"],
  endpoints: (builder) => ({
    // Courses
    getCourses: builder.query({
      query: () => "/courses",
      providesTags: ["Course"],
      transformResponse: (response) => response.content || response.data || response,
    }),
    createCourse: builder.mutation({
      query: (body) => ({ url: "/courses", method: "POST", body }),
      invalidatesTags: ["Course"],
    }),
    updateCourse: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/courses/${id}`, method: "PUT", body }),
      invalidatesTags: ["Course"],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({ url: `/courses/${id}`, method: "DELETE" }),
      invalidatesTags: ["Course"],
    }),

    // Teachers
    getTeachers: builder.query({
      query: () => "/teachers",
      providesTags: ["Teacher"],
      transformResponse: (response) => response.content || response.data || response,
    }),
    createTeacher: builder.mutation({
      query: (body) => ({ url: "/teachers", method: "POST", body }),
      invalidatesTags: ["Teacher"],
    }),
    updateTeacher: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/teachers/${id}`, method: "PUT", body }),
      invalidatesTags: ["Teacher"],
    }),
    deleteTeacher: builder.mutation({
      query: (id) => ({ url: `/teachers/${id}`, method: "DELETE" }),
      invalidatesTags: ["Teacher"],
    }),

    // Users
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
      transformResponse: (response) => response.content || response.data || response,
    }),
    createUser: builder.mutation({
      query: (body) => ({ url: "/users", method: "POST", body }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/users/${id}`, method: "PUT", body }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: ["User"],
    }),

    // News
    getNews: builder.query({
      query: () => "/news",
      providesTags: ["News"],
      transformResponse: (response) => response.content || response.data || response,
    }),
    createNews: builder.mutation({
      query: (body) => ({ url: "/news", method: "POST", body }),
      invalidatesTags: ["News"],
    }),
    updateNews: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/news/${id}`, method: "PUT", body }),
      invalidatesTags: ["News"],
    }),
    deleteNews: builder.mutation({
      query: (id) => ({ url: `/news/${id}`, method: "DELETE" }),
      invalidatesTags: ["News"],
    }),

    // Videos
    getVideos: builder.query({
      query: () => "/videos",
      providesTags: ["Video"],
      transformResponse: (response) => response.content || response.data || response,
    }),

    createVideo: builder.mutation({
      query: ({ videoFile, videoDTO }) => {
        const formData = new FormData();
        formData.append("video", videoFile);
        formData.append("videoDTO", JSON.stringify(videoDTO));

        return {
          url: "/videos/upload",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Video"],
    }),

    updateVideo: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/videos/${id}`, method: "PUT", body }),
      invalidatesTags: ["Video"],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({ url: `/videos/${id}`, method: "DELETE" }),
      invalidatesTags: ["Video"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetTeachersQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetNewsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
  useGetVideosQuery,
  useCreateVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} = api;
