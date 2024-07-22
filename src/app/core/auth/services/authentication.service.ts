import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SignupRequest } from '../models/signup-request';
import { SignupResponse } from '../models/signup-response';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authUrl = 'http://173.249.40.235:5005/api/User';

  constructor(private http: HttpClient) {}

  signup(signupRequest: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.authUrl}/SignUp()`, signupRequest).pipe(
      tap(response => {      
        localStorage.setItem('signupEmail', signupRequest.Email);
        localStorage.setItem('signupPassword', signupRequest.Password);
        localStorage.setItem('userId', response.id);
        localStorage.setItem('username', response.username);
      })
    );
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}/Login()`, loginRequest).pipe(
      tap(response => { 
        localStorage.setItem('loginEmail', loginRequest.Username); 
        localStorage.setItem('loginPassword', loginRequest.Password); 
        if (response.Login.AccessToken) {
          localStorage.setItem('token', response.Login.AccessToken);
        }
        if (response.Login.RefreshToken) {
          localStorage.setItem('refreshToken', response.Login.RefreshToken);
        }
      })
    );
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken'); // Check if accessToken is stored
  }
  
}
