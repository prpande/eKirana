import { inject } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { BehaviorSubject } from "rxjs";
import { ImageService } from "../services/image.service";

export class Image {
    imageId?: string;
    userId?: string;
    imageData?: string;
    name?: string;
    
    initialized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(init?: Partial<Image>) {
        this.setValues(init);
    }

    setValues(init?: Partial<Image>) {
        Object.assign(this, init);
        this.setInitialized();
    }

    initObjFromImage(file: any) {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.imageData = reader.result as string;
                this.name = file.name;
                this.setInitialized();
            }

            reader.readAsDataURL(file);
        }
    }

    setInitialized(){
        if(this.imageData){
            this.initialized.next(true);
        }
    }

    get isInitialized(): boolean{
        return this.initialized.value;
    }
}