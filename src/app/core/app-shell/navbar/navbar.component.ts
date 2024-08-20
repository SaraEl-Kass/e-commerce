import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core'
import { Subject, Subscription } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { selectLoginUsername } from '../../auth/state-management/login.selectors'
import { SearchService } from '../../../shared/services/search.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private searchSubject = new Subject<string>()
  // private searchSubscription: Subscription
  showSearchBar: boolean = true
  isAdmin: boolean = false

  @Output() search = new EventEmitter<string>()

  constructor(
    private searchService: SearchService,
    private router: Router,
    private store: Store
  ) {
    // this.searchSubscription = this.searchSubject
    //   .pipe(debounceTime(300), distinctUntilChanged())
    //   .subscribe((searchTerm) => {
    //     this.search.emit(searchTerm)
    //   })
  }

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
    this.router.navigate(['/cart'])
  }

  ngOnDestroy(): void {
    // this.searchSubscription.unsubscribe()
  }
}
