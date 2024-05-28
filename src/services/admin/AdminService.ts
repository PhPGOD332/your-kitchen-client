import $api from "@/http";
import type { IUser } from "@/types/IUser";
import type { AxiosResponse } from "axios";

export default class AdminService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return await $api.get<IUser[]>("/users");
  }

  static async getUser(id: string): Promise<AxiosResponse<IUser>> {
    return await $api.get<IUser>(`/users/${id}`);
  }

  static async addUser(body: object): Promise<AxiosResponse<IUser>> {
    return await $api.post<IUser>(`/users`, body);
  }

  static async deleteUser(id: string): Promise<AxiosResponse<IUser>> {
    return await $api.delete<IUser>(`/users/${id}`);
  }

  static async updateUser(
    id: string,
    body: object,
  ): Promise<AxiosResponse<IUser>> {
    return await $api.patch<IUser>(`/users/${id}`, body);
  }
}
