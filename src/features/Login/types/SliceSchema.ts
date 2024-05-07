import { IBaseSliceSchema } from "shared/types";
import { ILoginResponse } from "./LoginType";

export interface ILoginSliceSchema extends IBaseSliceSchema {
  isAuth: boolean;
  userData?: ILoginResponse;
}
