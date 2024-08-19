import { Component, OnInit, inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store, select } from '@ngrx/store'
import { login } from '../../state-management/login.actions'
import { LoginRequest } from '../../models/login-request'
import {
  selectLoginError,
  selectLoginLoading,
  selectLoginResponse,
} from '../../state-management/login.selectors'
import { Router } from '@angular/router'
import { IndexedDBService } from '../../../../shared/services/indexeddb.service'
import { UserProfileService } from '../../../../features/user-settings/services/user-profile.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  loading$ = this.store.pipe(select(selectLoginLoading))
  error$ = this.store.pipe(select(selectLoginError))
  private indexedDBService = inject(IndexedDBService)
  private userProfileService = inject(UserProfileService)

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
    this.store
      .pipe(select(selectLoginResponse))
      .subscribe(async (loginResponse) => {
        if (loginResponse) {
          const email = this.loginForm.value.email
          const userProfile = await this.indexedDBService.getUserInfo(email)

          if (userProfile) {
            this.userProfileService.setProfileImage(userProfile.profileImage)
            this.router.navigate(['/product-list'])
          }
        }
      })
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        Username: this.loginForm.value.email,
        Password: this.loginForm.value.password,
      }
      this.store.dispatch(login({ loginRequest }))
    }
  }
}
