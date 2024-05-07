import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginApi } from "../../api/LoginApi";
import { ILogin, ILoginResponse } from "../../types/LoginType";

export const login = createAsyncThunk(
  "login/post",
  async (param: ILogin, { rejectWithValue }) => {
    try {
      const response = await LoginApi.Login(param);
      return response.data as ILoginResponse;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
