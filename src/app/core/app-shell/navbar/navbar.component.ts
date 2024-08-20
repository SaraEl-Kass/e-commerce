import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { Subject } from 'rxjs'

import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { SearchService } from '../../../shared/services/search.service'
import { CartService } from '../../../features/services/cart.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private searchSubject = new Subject<string>()
  showSearchBar: boolean = true
  isAdmin: boolean = false
  showBadge: boolean = false

  @Output() search = new EventEmitter<string>()

  constructor(
    private searchService: SearchService,
    private router: Router,
    private store: Store,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.showSearchBar =
        !this.router.url.includes('product-details') &&
        !this.router.url.includes('wishlist') &&
        !this.router.url.includes('cart')
    })

    // Check if user is admin
    const loginEmail = localStorage.getItem('loginEmail')
    if (loginEmail === 'admin@nmh.com') {
      this.isAdmin = true
    } else {
      this.isAdmin = false
    }

    this.cartService.showBadge$.subscribe((show) => {
      this.showBadge = show
    })
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value
    this.searchService.setSearchTerm(searchTerm)
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const searchTerm = (event.target as HTMLInputElement).value
      this.searchSubject.next(searchTerm)
    }
  }

  onUserIconClick(): void {
    if (this.isAdmin) {
      this.router.navigate(['/admin-dashboard'])
    } else {
      this.router.navigate(['/user-profile'])
    }
  }

  onWishlistIconClick(): void {
    this.router.navigate(['/wishlist'])
  }

  onCartIconClick(): void {
    this.cartService.hideBadge()
    this.router.navigate(['/cart'])
  }
}
