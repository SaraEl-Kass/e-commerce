import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WishlistComponent } from './Components/wishlist/wishlist.component'
import { SharedModule } from '../shared/shared.module'
import { AppShellModule } from '../core/app-shell/app-shell.module'
import { CartComponent } from './Components/cart/cart.component'
import { OrderedProductComponent } from './Components/ordered-product/ordered-product.component'

@NgModule({
  declarations: [WishlistComponent, CartComponent, OrderedProductComponent],
  imports: [CommonModule, SharedModule, AppShellModule],
  exports: [WishlistComponent, CartComponent, OrderedProductComponent],
})
export class FeaturesModule {}
