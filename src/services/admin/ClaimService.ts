import $api from "@/http";
import type { IClaim } from "@/types/IClaim";
import { CreateClaimDto } from "@/types/dtos/CreateClaim.dto";
import type { AxiosResponse } from "axios";

export default class ClaimService {
  static async getClaims(): Promise<AxiosResponse<IClaim[]>> {
    return await $api.get<IClaim[]>("/claims");
  }

  static async getClaim(id: string): Promise<AxiosResponse<IClaim>> {
    return await $api.get<IClaim>(`/claims/${id}`);
  }

  static async addClaim(body: CreateClaimDto): Promise<AxiosResponse<IClaim>> {
    return await $api.post<IClaim>(`/claims`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static async addFileClaim(body: FormData): Promise<AxiosResponse<IClaim>> {
    return await $api.post<IClaim>(`/claims`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async deleteClaim(id: string): Promise<AxiosResponse<IClaim>> {
    return await $api.delete<IClaim>(`/claims/${id}`);
  }

  static async updateClaim(
    id: string,
    body: object,
  ): Promise<AxiosResponse<IClaim>> {
    return await $api.patch<IClaim>(`/claims/${id}`, body);
  }
}
