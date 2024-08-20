import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'
import { WishlistComponent } from './Components/wishlist/wishlist.component'
import { SharedModule } from '../shared/shared.module'
import { CartComponent } from './Components/cart/cart.component'
import { OrderedProductComponent } from './Components/ordered-product/ordered-product.component'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { OrderConfirmationDialogComponent } from './Components/order-confirmation-dialog/order-confirmation-dialog.component'

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'wishlist', component: WishlistComponent },
]

@NgModule({
  declarations: [
    WishlistComponent,
    CartComponent,
    OrderedProductComponent,
    OrderConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatIconModule,
  ],
  exports: [WishlistComponent, CartComponent, OrderedProductComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeaturesModule {}
