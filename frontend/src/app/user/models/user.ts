import { UserType } from "./userType";
import { Address } from "./address";
import { Alert } from "./alert";
import { Vehicle } from "./vehicle";

export class User {
    userId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    userType?: UserType;
    address?: Address;
    deliveryAddresses?: Address[];
    panCardNumber?: string;
    gstIdNumber?: string;
    vehicleInfo?: Vehicle;
    alertList?: Alert[];

    constructor(init?: Partial<User>){
        this.setValues(init);
    }

    setValues(init?: Partial<User>) {
        Object.assign(this, init);
    }
}