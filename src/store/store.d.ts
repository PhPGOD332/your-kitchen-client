import type { IUser } from "@/types/IUser";
import store from "./store";

export type TState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;

export interface IUserStore {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
  error: null | string;
}
export interface IClientStore {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
  error: null | string;
}
