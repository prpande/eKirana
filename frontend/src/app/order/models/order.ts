import { Product } from "../../shop/models/product";
import { Address } from "../../user/models/address";
import { OrderStatus } from "./orderStatus";

export class Order {
    orderId?: string;
    orderedItems?: Product[];
    totalAmount?: number;
    deliveryAddress?: Address;
    status?: OrderStatus;
    placedOn?: Date;
    deliveredOn?: Date;
    customerId?: string;
    sellerId?: string;
    carrierId?: string;
    comments?: string;

    constructor(init?: Partial<Order>){
        this.setValues(init);
    }

    setValues(init?: Partial<Order>) {
        Object.assign(this, init);
    }
}