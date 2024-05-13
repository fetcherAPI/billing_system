import { IRegisterCompany } from "./../../types/SliceSchema";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IRegisterSliceSchema,
  keyOfRegisterSliceSchema,
} from "features/Register/types/SliceSchema";

const initialState: IRegisterSliceSchema = {
  registerData: {} as IRegisterCompany,
  isLoading: false,
  error: undefined,
};

export const RegisterSlice = createSlice({
  name: "RegisterSlice",
  initialState,
  reducers: {
    setRegisterProperty(
      state,
      action: PayloadAction<{ key: keyOfRegisterSliceSchema; data: any }>
    ) {
      state.registerData = {
        ...state.registerData,
        [action.payload.key]: action.payload.data,
      };
    },
  },
});

export const { setRegisterProperty } = RegisterSlice.actions;
export const RegisterSliceReducer = RegisterSlice.reducer;
