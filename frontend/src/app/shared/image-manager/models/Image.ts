export class Image {
    imageId?: string;
    userId?: string;
    imageData?: string;
    name?: string;
    
    constructor(init?: Partial<Image>) {
        this.setValues(init);
    }

    setValues(init?: Partial<Image>) {
        Object.assign(this, init);
    }
}