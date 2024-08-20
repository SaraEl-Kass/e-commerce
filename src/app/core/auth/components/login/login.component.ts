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
import { MatDialog } from '@angular/material/dialog'
import { LoginErrorDialogComponent } from '../../login-error-dialog/login-error-dialog.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  loading$ = this.store.pipe(select(selectLoginLoading))
  error$ = this.store.pipe(select(selectLoginError))
  private dialog = inject(MatDialog)

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
          this.router.navigate(['/product-list'])
        }
      })

    this.error$.subscribe((error) => {
      if (error && this.isUnauthorizedError(error)) {
        this.dialog.open(LoginErrorDialogComponent, {
          width: '400px',
        })
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

  private isUnauthorizedError(error: any): boolean {
    if (typeof error === 'string') {
      // If the error is just a string, check if it contains "Unauthorized"
      return error.includes('Unauthorized')
    }

    // If it's an object, check for the status property
    return error?.status === 401 || error?.statusText === 'Unauthorized'
  }
}
