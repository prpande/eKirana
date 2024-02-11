import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IdGeneratorService } from 'src/app/shared/services/id-generator.service';
import { ImageWrapper } from '../../models/ImageWrapper';
import { ImageService } from '../../services/image.service';
import { ImageCacheService } from '../../services/image-cache.service';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css']
})
export class ImageInputComponent implements OnInit {

  @Input()
  imgObj!: ImageWrapper;

  @Input()
  isReadOnly: boolean = true;

  @Output()
  imageLoadedEvent: EventEmitter<string> = new EventEmitter<string>();

  imagePathFormControl: FormControl = new FormControl('');
  imageInitialized: boolean = false;

  constructor(private idGenerator: IdGeneratorService,
    private imageService: ImageService,
    private imageCache: ImageCacheService) {
  }

  ngOnInit(): void {
    if (this.imgObj) {
      this.imagePathFormControl.setValue(this.imgObj.imgData.name);
      this.imageInitialized = true;
    }
  }

  onFileChange(event: any) {
    this.imgObj = new ImageWrapper();
    this.imagePathFormControl.setValue(event.target.files[0].name)
    this.imgObj.initObjFromImage(event.target.files[0], this.idGenerator.generateId());
    this.imgObj.initialized.subscribe(status => {
      this.imageInitialized = status;
      if (status) {
        this.imageCache.addImage(this.imgObj.imgData);
        this.imageLoadedEvent.emit(this.imgObj.imgData.imageId);
      }
    })
  }

  get imageSrcString(): any {
    if (this.imgObj && this.imgObj.isInitialized) {
      return this.imageService.getImageSrcString(this.imgObj.imgData);
    }
  }
}
