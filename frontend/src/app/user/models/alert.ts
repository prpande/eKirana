import { AlertLevel } from "./alertLevel";

export class Alert {
    alertId?: string;
    level?: AlertLevel;
    message?: string;
    timeStamp?: Date;
    cleared?: boolean;

    constructor(init?: Partial<Alert>){
        this.setValues(init);
    }

    setValues(init?: Partial<Alert>) {
        Object.assign(this, init);
    }
}