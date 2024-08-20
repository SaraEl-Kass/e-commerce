import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './components/login/login.component'
import { SignupComponent } from './components/signup/signup.component'
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthenticationService } from './services/authentication.service'
import { SharedModule } from '../../shared/shared.module'
import { LoginErrorDialogComponent } from './login-error-dialog/login-error-dialog.component'
import { MatIcon } from '@angular/material/icon'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
]

@NgModule({
  declarations: [LoginComponent, SignupComponent, LoginErrorDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    MatIcon,
  ],
  exports: [LoginComponent, SignupComponent],
  providers: [AuthenticationService],
})
export class AuthModule {}
