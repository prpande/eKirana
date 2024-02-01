import { UserType } from "./userType";

export type UserCredential = {
    userId?: string;
    password?: string;
    userType?: UserType;
}