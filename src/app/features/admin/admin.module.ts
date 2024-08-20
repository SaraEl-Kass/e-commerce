import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [{ path: '', component: AdminDashboardComponent }]

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [AdminDashboardComponent],
})
export class AdminModule {}
