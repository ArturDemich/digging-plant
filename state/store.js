import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dataSliceReducer from './dataSlice';

const rootReducer = combineReducers({
    dataSliceReducer,
});

export const store = configureStore({
    reducer: dataSliceReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

