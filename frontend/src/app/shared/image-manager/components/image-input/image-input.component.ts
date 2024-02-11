import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IdGeneratorService } from 'src/app/shared/services/id-generator.service';
import { Image } from '../../models/Image';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css']
})
export class ImageInputComponent implements OnInit{

  @Input()
  imgObj!: Image;

  @Input()
  isReadOnly: boolean = true;

  imagePathFormControl: FormControl = new FormControl('');
  imageInitialized: boolean = false;

  constructor(private idGenerator: IdGeneratorService, private imageService: ImageService) {
  }

  ngOnInit(): void {
    if(this.imgObj){
      this.imagePathFormControl.setValue(this.imgObj.name);
    }
  }

  onFileChange(event: any) {
    this.imgObj = new Image();
    this.imagePathFormControl.setValue(event.target.files[0].name)
    this.imgObj.initObjFromImage(event.target.files[0]);
    this.imgObj.imageId = this.idGenerator.generateId();
    this.imgObj.initialized.subscribe(status =>{
      this.imageInitialized = status;
    })
  }

  get imageSrcString(): any{
    if(this.imgObj && this.imgObj.isInitialized){
      return this.imageService.getImageSrcString(this.imgObj);
    }
  }
}
