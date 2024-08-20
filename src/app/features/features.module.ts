import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WishlistComponent } from './Components/wishlist/wishlist.component'
import { SharedModule } from '../shared/shared.module'
import { CartComponent } from './Components/cart/cart.component'
import { OrderedProductComponent } from './Components/ordered-product/ordered-product.component'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'wishlist', component: WishlistComponent },
]

@NgModule({
  declarations: [WishlistComponent, CartComponent, OrderedProductComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [WishlistComponent, CartComponent, OrderedProductComponent],
})
export class FeaturesModule {}
