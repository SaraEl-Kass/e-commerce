import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AppShellModule } from '../../core/app-shell/app-shell.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProductListComponent }
];

@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    AppShellModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [ProductListComponent]
})
export class ProductListingModule { }
