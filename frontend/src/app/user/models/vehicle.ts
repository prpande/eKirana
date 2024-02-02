export class Vehicle {
    registrationNumber?: string;
    drivingLicenseNumber?: string;
    make?: string;
    model?: string;
    vehicleType?: string;
    capacity?: string;
    isDelivering?: boolean;
    latitude?: number;
    longitude?: number;

    constructor(init?: Partial<Vehicle>){
        this.setValues(init);
    }

    setValues(init?: Partial<Vehicle>) {
        Object.assign(this, init);
    }
}