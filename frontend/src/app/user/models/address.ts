export class Address {
    addressId?: string;
    userId?: string;
    fullName?: string;
    line1?: string;
    line2?: string;
    landmark?: string;
    city?: string;
    state?: string;
    pinCode?: number;
    latitude?: number;
    longitude?: number;
    phoneNumber?: string;
    isDefault?: boolean;
    instructions?: string;
    displayImageUrl?: string;

    constructor(init?: Partial<Address>) {
        this.setValues(init);
    }

    setValues(init?: Partial<Address>) {
        Object.assign(this, init);
    }
}