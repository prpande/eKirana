import { UserType } from "./userType";

export class UserCredential {
    userId?: string;
    password?: string;
    userType?: UserType;

    constructor(init?: Partial<UserCredential>){
        this.setValues(init);
    }

    setValues(init?: Partial<UserCredential>) {
        Object.assign(this, init);
    }
}