// store/todoApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://digacc-5.onrender.com/api',
  }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => '/courses',
      transformResponse: (response) => response.content, // BURADA DƏYİŞİKLİK!
    }),
    createTodo: builder.mutation({
      query: ({ title, img }) => ({
        url: '/courses',
        method: 'POST',
        body: { title, img },
      }),
    }),
    updateTodo: builder.mutation({
      query: ({ id, title, img }) => ({
        url: `/courses/${id}`,
        method: 'PUT',
        body: { title, img },
      }),
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
