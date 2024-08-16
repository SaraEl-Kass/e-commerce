import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilterService } from '../../../../shared/services/filter.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  categories$: Observable<string[]> = of([]);

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.categories$ = this.filterService.getCategories();
    this.categories$.subscribe(categories => {
      console.log('Fetched Categories:', categories);
    });
  }
}

