import { Product } from "../product/product";
import { Address } from "../user/address";
import { OrderStatus } from "./orderStatus";

export type Order = {
    orderId: string;
    orderedItems: Product[];
    totalAmount: number;
    deliveryAddress: Address;
    status: OrderStatus;
    placedOn: Date;
    deliveredOn: Date;
    customerId: string;
    sellerId: string;
    carrierId: string;
    comments: string;
}