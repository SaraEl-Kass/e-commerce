import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WishlistComponent } from './wishlist/wishlist.component'
import { SharedModule } from '../shared/shared.module'
import { AppShellModule } from '../core/app-shell/app-shell.module'
import { CartComponent } from './cart/cart.component'

@NgModule({
  declarations: [WishlistComponent, CartComponent],
  imports: [CommonModule, SharedModule, AppShellModule],
  exports: [WishlistComponent, CartComponent],
})
export class FeaturesModule {}
