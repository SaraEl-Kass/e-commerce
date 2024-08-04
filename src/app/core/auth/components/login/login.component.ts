import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { login } from '../../state-management/login.actions';
import { LoginRequest } from '../../models/login-request';
import { selectLoginError, selectLoginLoading, selectLoginResponse } from '../../state-management/login.selectors';
import { Router } from '@angular/router'; 
import { LoginResponse } from '../../models/login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading$ = this.store.pipe(select(selectLoginLoading));
  error$ = this.store.pipe(select(selectLoginError));

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.store.pipe(select(selectLoginResponse)).subscribe(loginResponse => {
      if (loginResponse) {
        this.router.navigate(['/product-list']); 
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        Username: this.loginForm.value.email,
        Password: this.loginForm.value.password
      };
      this.store.dispatch(login({ loginRequest }));
    }
  }
}
