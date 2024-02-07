import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../models/product';
import { ProductFormComponent } from '../product-form/product-form.component';

export interface EditProductDialogData {
  operation: string;
  productInfo: Product
}

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css'],
})
export class EditProductDialogComponent {

  @ViewChild(ProductFormComponent) productForm!: ProductFormComponent;

  constructor(public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: EditProductDialogData) { }

    submitFormData(){
      this.dialogRef.close(new Product(this.productForm.productFormGroup.value));
    }
}
