import { UserType } from "./UserType";

export type UserCredential = {
    userId: string;
    password: string;
    userType: UserType;
}