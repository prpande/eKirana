export class Product {
    productId?: string;
    name?: string;
    price?: number;
    specifications?: string;
    description?: string;
    category?: string;
    imageUrl?: string;
    available?: boolean;
    quantity?: number;
    sellerId?: string;

    constructor(init?: Partial<Product>){
        this.setValues(init);
    }

    setValues(init?: Partial<Product>) {
        Object.assign(this, init);
    }
}