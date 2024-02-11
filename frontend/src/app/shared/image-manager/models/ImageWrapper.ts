import { BehaviorSubject } from "rxjs";
import { Image } from "./Image";



export class ImageWrapper {

    imgData!: Image;

    initialized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor() { }


    initObjFromImage(file: any, imageId: string) {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.imgData = new Image();
                this.imgData.imageId = imageId;
                this.imgData.imageData = reader.result as string;
                this.imgData.name = file.name;
                this.setInitialized();
            }

            reader.readAsDataURL(file);
        }
    }

    setInitialized() {
        if (this.imgData.imageData) {
            this.initialized.next(true);
        }
    }

    get isInitialized(): boolean {
        return this.initialized.value;
    }
}