import { Component, OnInit } from '@angular/core'
import { CartService } from '../../services/cart.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = []

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items
    })
    this.cartService.refreshCartItems() // Load initial cart items
  }

  async onProductRemoved(productId: number): Promise<void> {
    await this.cartService.decreaseQuantity({ id: productId, quantity: 0 })
    this.cartItems = this.cartItems.filter((item) => item.id !== productId)
  }

  async increaseQuantity(item: any): Promise<void> {
    if (item.quantity < 10) {
      await this.cartService.increaseQuantity(item)
    }
  }

  async decreaseQuantity(item: any): Promise<void> {
    await this.cartService.decreaseQuantity(item)
  }

  getSubtotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  }
}
