import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AppShellModule } from '../../core/app-shell/app-shell.module';


@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    AppShellModule
  ],
  exports: [ProductListComponent]
})
export class ProductListingModule { }
