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

    // Contact Forms
    getContactForms: builder.query({
      query: () => "/contact-forms",
      providesTags: ["ContactForm"],
      transformResponse: (response) => response.content || response.data || response,
    }),
    getContactForm: builder.query({
      query: (id) => `/contact-forms/${id}`,
      providesTags: ["ContactForm"],
    }),
    downloadCv: builder.query({
      query: (id) => ({
        url: `/contact-forms/${id}/cv`,
        method: "GET",
      }),
      // server cavabı `blob` tipində gələcək
      transformResponse: async (response, meta, arg) => {
        const blob = await response.blob();
        return blob;
      },
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
  useGetNewsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
  useGetContactFormsQuery,
  useGetContactFormQuery,
  useDownloadCvQuery,

} = api;
