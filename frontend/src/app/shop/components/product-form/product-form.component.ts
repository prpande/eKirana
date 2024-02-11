import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdGeneratorService } from 'src/app/shared/services/id-generator.service';
import { ImageWrapper } from 'src/app/shared/image-manager/models/ImageWrapper';
import { ImageService } from 'src/app/shared/image-manager/services/image.service';
import { Image } from 'src/app/shared/image-manager/models/Image';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input()
  product: Product;

  productImg!: ImageWrapper;
  displayInput: boolean = false;
  

  productFormGroup!: FormGroup;
  get productId() { return this.productFormGroup.get("productId"); }
  get name() { return this.productFormGroup.get("name"); }
  get price() { return this.productFormGroup.get("price"); }
  get specifications() { return this.productFormGroup.get("specifications"); }
  get description() { return this.productFormGroup.get("description"); }
  get category() { return this.productFormGroup.get("category"); }
  get imageUrl() { return this.productFormGroup.get("imageUrl"); }
  get available() { return this.productFormGroup.get("available"); }
  get quantity() { return this.productFormGroup.get("quantity"); }
  get sellerId() { return this.productFormGroup.get("sellerId"); }

  constructor(private fb: FormBuilder,
    private idGenerator: IdGeneratorService,
    private imageService: ImageService,
    private logger: LoggerService) {
    this.product = new Product();
  }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      productId: [this.idGenerator.generateId()],
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required]],
      specifications: [''],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      imageUrl: [''],
      available: ['false', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      sellerId: [''],
    })

    if (this.product && this.product.productId) {
      this.productId?.setValue(this.product.productId);
      this.name?.setValue(this.product.name);
      this.price?.setValue(this.product.price);
      this.specifications?.setValue(this.product.specifications);
      this.description?.setValue(this.product.description);
      this.category?.setValue(this.product.category);
      this.imageUrl?.setValue(this.product.imageUrl);
      this.available?.setValue(this.product.available);
      this.quantity?.setValue(this.product.quantity);
      this.sellerId?.setValue(this.product.sellerId);
    }

    if (this.imageUrl?.value) {
      this.imageService.getImage(this.imageUrl?.value).subscribe({
        next: imgData => {
          if (imgData) {
            this.productImg = new ImageWrapper();
            this.productImg.imgData = new Image(imgData);
            this.productImg.setInitialized();
            this.displayInput = true;
          }
        },
        error: err => {
          this.logger.error(err);
        }
      })
    } else {
      this.displayInput = true;
    }
  }

  isQuantityValid() {
    if (this.quantity && this.quantity?.value > 0) {
      return true;
    }

    return false;
  }

  onLoadingProductImage(imageId: string) {
    this.imageUrl?.setValue(imageId);
    this.productFormGroup.markAsDirty();
  }
}
