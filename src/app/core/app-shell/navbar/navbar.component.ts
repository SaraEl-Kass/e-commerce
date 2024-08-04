import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  private searchSubject = new Subject<string>();
  private searchSubscription: Subscription;

  @Output() search = new EventEmitter<string>();

  constructor() {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300), 
      distinctUntilChanged() 
    ).subscribe(searchTerm => {
      this.search.emit(searchTerm);
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
