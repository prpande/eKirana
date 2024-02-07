import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdGeneratorService } from 'src/app/shared/services/id-generator.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{

  @Input()
  product: Product;

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
  
  constructor(private fb: FormBuilder, private idGenerator: IdGeneratorService){
    this.product = new Product();
  }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      productId: [this.idGenerator.generateId()],
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required]],
      specifications: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      available: ['false', [Validators.required]],
      quantity: [0, [Validators.required]],
      sellerId: ['', [Validators.required]],
    })

    if(this.product && this.product.productId){
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
  }

  isQuantityValid(){
    if( this.quantity && this.quantity?.value > 0){
      return true;
    }

    return false;
  }
}
