// import { Injectable } from '@angular/core'
// import { BehaviorSubject } from 'rxjs'
// import { Product } from '../../shared/models/models/product'

// @Injectable({
//   providedIn: 'root',
// })
// export class WishlistService {
//   private wishlist: Product[] = []
//   private wishlistSubject = new BehaviorSubject<Product[]>([])

//   wishlist$ = this.wishlistSubject.asObservable()

//   addToWishlist(product: Product): void {
//     const exists = this.wishlist.find((item) => item.id === product.id)
//     if (!exists) {
//       this.wishlist.push(product)
//       this.wishlistSubject.next(this.wishlist)
//     }
//   }

//   removeFromWishlist(productId: number): void {
//     this.wishlist = this.wishlist.filter((item) => item.id !== productId)
//     this.wishlistSubject.next(this.wishlist)
//   }

//   getWishlist(): Product[] {
//     return this.wishlist
//   }

//   clearWishlist(): void {
//     this.wishlist = []
//     this.wishlistSubject.next(this.wishlist)
//   }
// }
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Product } from '../../shared/models/models/product'

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlist: Product[] = []
  private wishlistSubject = new BehaviorSubject<Product[]>([])

  wishlist$ = this.wishlistSubject.asObservable()

  constructor() {
    this.loadWishlistFromLocalStorage() // Load wishlist from localStorage when the service is initialized
  }

  addToWishlist(product: Product): void {
    const exists = this.wishlist.find((item) => item.id === product.id)
    if (!exists) {
      this.wishlist.push(product)
      this.wishlistSubject.next(this.wishlist)
      this.saveWishlistToLocalStorage() // Save the updated wishlist to localStorage
    }
  }

  removeFromWishlist(productId: number): void {
    this.wishlist = this.wishlist.filter((item) => item.id !== productId)
    this.wishlistSubject.next(this.wishlist)
    this.saveWishlistToLocalStorage() // Save the updated wishlist to localStorage
  }

  getWishlist(): Product[] {
    return this.wishlist
  }

  clearWishlist(): void {
    this.wishlist = []
    this.wishlistSubject.next(this.wishlist)
    localStorage.removeItem('likedProductIds') // Clear the wishlist from localStorage
  }

  public loadWishlistFromLocalStorage(): void {
    // Make this method public
    const likedProductIds = JSON.parse(
      localStorage.getItem('likedProductIds') || '[]'
    )
    this.fetchProductsByIds(likedProductIds).then((products) => {
      this.wishlist = products
      this.wishlistSubject.next(this.wishlist)
    })
  }

  private saveWishlistToLocalStorage(): void {
    const likedProductIds = this.wishlist.map((product) => product.id)
    localStorage.setItem('likedProductIds', JSON.stringify(likedProductIds))
  }

  private async fetchProductsByIds(ids: number[]): Promise<Product[]> {
    const products: Product[] = []
    for (const id of ids) {
      const product = await this.fetchProductById(id)
      if (product) {
        products.push(product)
      }
    }
    return products
  }

  private async fetchProductById(id: number): Promise<Product | null> {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch product with ID ${id}`)
      }
      const product: Product = await response.json()
      return product
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
