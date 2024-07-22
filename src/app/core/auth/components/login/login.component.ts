import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginRequest } from '../../models/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        Username: this.loginForm.value.email,
        Password: this.loginForm.value.password
      };
      this.authService.login(loginRequest).subscribe(
        response => {
          console.log('Login successful:', response);
          //this.router.navigate(['/product-list']);
        },
        error => {
          console.error('Login error:', error);
        }
      );
    }
  }
}
