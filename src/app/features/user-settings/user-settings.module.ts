import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from '../../core/auth/components/login/login.component'

const routes: Routes = [
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'login', component: LoginComponent },
]
@NgModule({
  declarations: [UserProfileComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [UserProfileComponent],
})
export class UserSettingsModule {}
