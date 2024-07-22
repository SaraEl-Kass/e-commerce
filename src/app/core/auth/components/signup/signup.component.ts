import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { SignupRequest } from '../../models/signup-request';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  roleName: string = 'user';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const signupRequest: SignupRequest = {
        Firstname: this.signupForm.value.firstname,
        Lastname: this.signupForm.value.lastname,
        Email: this.signupForm.value.email,
        Password: this.signupForm.value.password,
        RoleName: this.roleName
      };
      this.authService.signup(signupRequest).subscribe(
        response => {
          console.log('Signup successful:', response);
          //this.router.navigate(['/login']);
        },
        error => {
          console.error('Signup error:', error);
        }
      );
    }
  }
}
