import { UserRoles } from "./UserRoles";

export interface IUser {
  email: string;
  isActivated: boolean;
  _id: string;
  role: {
    value: UserRoles,
    label: string;
  };
  activationLink: string;
}