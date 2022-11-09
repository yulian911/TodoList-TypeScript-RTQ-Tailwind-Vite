import {
    createApi,
    fetchBaseQuery
}from '@reduxjs/toolkit/query/react'

export interface TodoCreate{
    description: string
    todoStatus:boolean
}

export interface TodoI extends TodoCreate{
    _id:string
}

enum Method{
    GET='GET',
    POST='POST',
    DELETE= 'DELETE',
    PUT= 'PUT',
}

export const todoApi = createApi({
    reducerPath:"todoApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:4000",
    }),
    tagTypes:["Todos"],
    endpoints:(builder)=>({
        getTodos:builder.query<TodoI[],void>({
            query:()=>`todos`,
            providesTags:['Todos']
        }),
        createTodo:builder.mutation<TodoI,TodoCreate>({
            query: todo => ({
                url: '/todos',
                method: Method.POST,
                body: {
                    ...todo,
                }
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo:builder.mutation<TodoI,TodoI>({
            query: todo => ({
                url: `/todos/${todo._id}`,
                method: Method.PUT,
                body: {
                    ...todo,
                }
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo:builder.mutation({
            query: (todoId) => ({
                url: `/todos/${todoId}`,
                method: Method.DELETE,
            }),
            invalidatesTags: ['Todos']
        }),
        getTodoById:builder.query<TodoI,string>({
            query:(todoId)=>`/todos/${todoId}`,
            providesTags:['Todos']
        }),
    })
})