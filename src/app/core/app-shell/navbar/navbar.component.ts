import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  private searchSubject = new Subject<string>();
  private searchSubscription: Subscription;
  showSearchBar: boolean = true;

  @Output() search = new EventEmitter<string>();

  constructor(private router: Router) {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300), 
      distinctUntilChanged() 
    ).subscribe(searchTerm => {
      this.search.emit(searchTerm);
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      // Check if the current URL is the product detail page
      this.showSearchBar = !this.router.url.includes('product-details');
    });
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchTerm);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const searchTerm = (event.target as HTMLInputElement).value;
      this.searchSubject.next(searchTerm);
    }
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
