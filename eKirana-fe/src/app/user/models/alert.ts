import { AlertLevel } from "./alertLevel";

export type Alert = {
    alertId: string;
    level: AlertLevel;
    message: string;
    timeStamp: Date;
    cleared: boolean;
}