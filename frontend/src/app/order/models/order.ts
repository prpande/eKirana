import { Product } from "../../shop/models/product";
import { Address } from "../../user/models/address";
import { OrderStatus } from "./orderStatus";

export type Order = {
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
}