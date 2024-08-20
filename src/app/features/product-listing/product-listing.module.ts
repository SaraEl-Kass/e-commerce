import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductListComponent } from './components/product-list/product-list.component'
import { SharedModule } from '../../shared/shared.module'
import { RouterModule, Routes } from '@angular/router'
import { ProductOperationsService } from '../services/product-operations.service'

const routes: Routes = [{ path: '', component: ProductListComponent }]

@NgModule({
  declarations: [ProductListComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [ProductOperationsService],
  exports: [ProductListComponent],
})
export class ProductListingModule {}
