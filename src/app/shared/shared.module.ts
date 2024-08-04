import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CurrencyConversionPipe } from './currency-conversion.pipe';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    CurrencyConversionPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingSpinnerComponent,
    CurrencyConversionPipe
  ]
})
export class SharedModule { }
