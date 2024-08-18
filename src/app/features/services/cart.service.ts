import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { IndexedDBService } from '../../shared/services/indexeddb.service'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([])
  cartItems$ = this.cartItemsSubject.asObservable()

  constructor(private indexedDBService: IndexedDBService) {}

  async refreshCartItems(): Promise<void> {
    const items = await this.indexedDBService.getCartItems()
    this.cartItemsSubject.next(items)
  }

  async addToCart(product: any): Promise<void> {
    await this.indexedDBService.addToCart(product)
    await this.refreshCartItems()
  }

  async increaseQuantity(item: any): Promise<void> {
    if (item.quantity < 10) {
      await this.indexedDBService.updateCartItemQuantity(
        item.id,
        item.quantity + 1
      )
      await this.refreshCartItems()
    }
  }

  async decreaseQuantity(item: any): Promise<void> {
    if (item.quantity > 1) {
      await this.indexedDBService.updateCartItemQuantity(
        item.id,
        item.quantity - 1
      )
    } else {
      await this.indexedDBService.removeFromCart(item.id)
    }
    await this.refreshCartItems()
  }
}
