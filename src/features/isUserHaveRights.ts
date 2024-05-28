import type { IUser } from "@/types/IUser";
import { UserRoles } from "@/types/UserRoles";

export const isUserHaveRights = (user: IUser, needRole: UserRoles): boolean => {
  if(!user.role) {
    return false;
  }
  return user.role.value === needRole ? true : false;
}