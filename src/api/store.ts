import { configureStore } from "@reduxjs/toolkit";
import modalReducer from '../features/modalSlice'
import { todoApi } from "../services/todos";

export const store =configureStore({
    reducer:{
        [todoApi.reducerPath]: todoApi.reducer,
        modal:modalReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(todoApi.middleware),
    devTools: false
})

export type RootState =ReturnType<typeof store.getState>

export type AppDispatch =typeof store.dispatch