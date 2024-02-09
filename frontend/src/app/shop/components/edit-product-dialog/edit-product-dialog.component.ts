import { AfterViewInit, ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
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
export class EditProductDialogComponent implements AfterViewInit {

  @ViewChild(ProductFormComponent) productForm!: ProductFormComponent;

  constructor(public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: EditProductDialogData,
    private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  submitFormData() {
    this.dialogRef.close(new Product(this.productForm.productFormGroup.value));
  }

  isSaveDisabled(): boolean {
    return (this.productForm && (!this.productForm.productFormGroup.valid || !this.productForm.productFormGroup.dirty))
  }
}
