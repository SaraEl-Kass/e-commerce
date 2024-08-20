import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>('')

  search$ = this.searchSubject
    .asObservable()
    .pipe(debounceTime(300), distinctUntilChanged())

  setSearchTerm(term: string): void {
    this.searchSubject.next(term)
  }
}
