import { Component, OnInit } from '@angular/core'
import { Observable, of } from 'rxjs'
import { FilterService } from '../../../../shared/services/filter.service'
import { UserProfileService } from '../../../user-settings/services/user-profile.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  categories$: Observable<string[]> = of([])

  constructor(
    private filterService: FilterService,
    private userProfileService: UserProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories$ = this.filterService.getCategories()
    this.categories$.subscribe((categories) => {
      console.log('Fetched Categories:', categories)
    })
  }

  onSignOut(): void {
    this.userProfileService.clearProfileData()
    this.router.navigate(['/login'])
  }
}
