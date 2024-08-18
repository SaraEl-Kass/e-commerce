import { Component, OnInit } from '@angular/core'
import { WishlistService } from '../services/wishlist.service'
import { BehaviorSubject, Observable } from 'rxjs'
import { Product } from '../../shared/models/models/product'

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishlist$: Observable<Product[]>
  filteredWishlist$: Observable<Product[]>
  private filteredWishlistSubject = new BehaviorSubject<Product[]>([])

  constructor(private wishlistService: WishlistService) {
    this.wishlist$ = this.wishlistService.wishlist$
    this.filteredWishlist$ = this.filteredWishlistSubject.asObservable()
  }

  ngOnInit(): void {
    // Load wishlist from localStorage
    this.wishlistService.loadWishlistFromLocalStorage()

    // Initialize filtered list with all wishlist items
    this.wishlist$.subscribe((products) => {
      this.filteredWishlistSubject.next(products)
    })
  }

  removeFromWishlist(productId: number): void {
    this.wishlistService.removeFromWishlist(productId)

    // Update filtered list after removal
    this.wishlist$.subscribe((products) => {
      this.filteredWishlistSubject.next(products)
    })
  }

  onSearch(searchTerm: string): void {
    this.wishlist$.subscribe((products) => {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      this.filteredWishlistSubject.next(filteredProducts)
    })
  }

  trackByProductId(index: number, product: Product): number {
    return product.id
  }
}
