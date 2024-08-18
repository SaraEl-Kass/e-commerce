import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './components/login/login.component'
import { SignupComponent } from './components/signup/signup.component'
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthenticationService } from './services/authentication.service'
import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, SharedModule],
  exports: [LoginComponent, SignupComponent],
  providers: [AuthenticationService],
})
export class AuthModule {}
