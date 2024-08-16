import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CurrencyConversionPipe } from './currency-conversion.pipe';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { RouterModule } from '@angular/router';
import { BlackButtonComponent } from './components/black-button/black-button.component';


@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    CurrencyConversionPipe,
    ProductCardComponent,
    BlackButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LoadingSpinnerComponent,
    CurrencyConversionPipe,
    ProductCardComponent,
    BlackButtonComponent
  ]
})
export class SharedModule { }
