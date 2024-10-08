import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductDetailsComponent } from './components/product-details/product-details.component'
import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [CommonModule, SharedModule],
})
export class ProductDetailsModule {}
