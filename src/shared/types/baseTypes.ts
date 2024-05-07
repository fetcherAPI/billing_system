import { AxiosError } from "axios";

export interface IBaseSliceSchema {
  isLoading: boolean;
  error: string | undefined | AxiosError;
}
