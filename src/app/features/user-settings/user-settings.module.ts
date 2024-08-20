import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [{ path: '', component: UserProfileComponent }]
@NgModule({
  declarations: [UserProfileComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [UserProfileComponent],
})
export class UserSettingsModule {}
