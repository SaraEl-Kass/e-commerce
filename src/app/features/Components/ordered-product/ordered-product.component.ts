import { Component, Input, Output, EventEmitter, inject } from '@angular/core'
import { CartService } from '../../services/cart.service'

@Component({
  selector: 'app-ordered-product',
  templateUrl: './ordered-product.component.html',
  styleUrls: ['./ordered-product.component.scss'],
})
export class OrderedProductComponent {
  @Input() product: any
  @Output() productRemoved = new EventEmitter<number>() // Emit the product ID when it's removed
  private cartService = inject(CartService)

  async decreaseQuantity(): Promise<void> {
    if (this.product.quantity > 1) {
      await this.cartService.decreaseQuantity(this.product)
    } else {
      await this.cartService.decreaseQuantity({ ...this.product, quantity: 0 })
      this.productRemoved.emit(this.product.id) // Notify the parent component to remove this item from the UI
    }
  }

  async increaseQuantity(): Promise<void> {
    if (this.product.quantity < 10) {
      // assuming 10 is the max quantity
      await this.cartService.increaseQuantity(this.product)
    }
  }
}
