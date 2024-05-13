import { AxiosInstance } from "axios";
import { CounterSchema } from "../../../../entities/Counter";
import { ILoginSliceSchema } from "features/Login/types/SliceSchema";
import { IRegisterSliceSchema } from "features/Register";

export interface StateSchema {
  counter: CounterSchema;
  login: ILoginSliceSchema;
  register: IRegisterSliceSchema;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
}
