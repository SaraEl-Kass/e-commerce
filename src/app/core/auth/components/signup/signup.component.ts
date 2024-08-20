import { Component, OnInit, inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { signup } from '../../state-management/signup.actions'
import { SignupRequest } from '../../models/signup-request'
import {
  selectSignupError,
  selectSignupLoading,
} from '../../state-management/signup.selectors'
import { IndexedDBService } from '../../../../shared/services/indexeddb.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup
  loading$ = this.store.select(selectSignupLoading)
  error$ = this.store.select(selectSignupError)
  private indexedDBService = inject(IndexedDBService)
  private router = inject(Router)

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const signupRequest: SignupRequest = {
        Firstname: this.signupForm.value.firstname,
        Lastname: this.signupForm.value.lastname,
        Email: this.signupForm.value.email,
        Password: this.signupForm.value.password,
        RoleName: 'user', // Default role
      }
      this.store.dispatch(signup({ signupRequest }))
      this.indexedDBService.saveUserInfo({
        firstName: signupRequest.Firstname,
        lastName: signupRequest.Lastname,
        email: signupRequest.Email,
        password: signupRequest.Password,
        phoneNumber: '',
        profileImage: 'assets/avatar.png',
      })
      this.router.navigate(['/login'])
    }
  }
}
