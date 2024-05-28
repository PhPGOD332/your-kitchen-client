import $api from "@/http";
import type { AuthResponse } from "@/types/response/AuthResponse";
import type { AxiosResponse } from "axios";
import axios from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default class AdminAuthService {
  static async login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return await $api.post<AuthResponse>("/login", { email, password });
  }

  static async registration(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return await $api.post<AuthResponse>("/registration", { email, password });
  }

  static async logout(): Promise<void> {
    return await $api.post("/logout");
  }

  static async refresh() {
    return await axios.get<AuthResponse>(`${NEXT_PUBLIC_API_URL}/api/refresh`, {
      withCredentials: true,
    });
  }
}
