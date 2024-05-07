import { StoreProvider } from "./ui/StoreProvider";
import { createReduxStore, useAppDispatch } from "./config/store";
import type { StateSchema, ThunkConfig } from "./config/StateSchema";
export type { RootState } from "./config/store";
export {
  StoreProvider,
  createReduxStore,
  StateSchema,
  ThunkConfig,
  useAppDispatch,
};
