import { configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { counterReducer } from "entities/Counter/";
import $api from "shared/api/api";
import { useDispatch } from "react-redux";
import { LoginSliceReducer } from "features/Login";

export function createReduxStore(initialState?: StateSchema) {
  return configureStore({
    reducer: {
      counter: counterReducer,
      login: LoginSliceReducer,
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api: $api,
          },
        },
      }),
  });
}

const store = createReduxStore();

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
