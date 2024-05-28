import $api from "@/http";
import type { IUser } from "@/types/IUser";
import type { AxiosResponse } from "axios";

export default class UserService {
  static async getUsers (): Promise<AxiosResponse<IUser[]>> {
    return await $api.get<IUser[]>('/users');
  }

}