import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GoogleMapsModule, MapDirectionsRenderer, MapDirectionsService } from '@angular/google-maps';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { QuantityFormComponent } from './components/quantity-form/quantity-form.component';
import { ImageManagerModule } from './image-manager/image-manager.module';
import { MapDialogComponent } from './components/map-dialog/map-dialog.component';
import { MapDisplayComponent } from './components/map-dialog/map-display/map-display.component';

@NgModule({
  declarations: [  
    QuantityFormComponent, MapDialogComponent, MapDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRippleModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSelectModule,
    MatInputModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    GoogleMapsModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    MatRadioModule,
    MatDialogModule,
    MatBadgeModule,
    ImageManagerModule
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRippleModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSelectModule,
    MatInputModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    GoogleMapsModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    MatRadioModule,
    MatDialogModule,
    MatBadgeModule,
    QuantityFormComponent,
    ImageManagerModule
  ],
})
export class SharedModule { }
