import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from 'rxjs'
import { SignupRequest } from '../models/signup-request'
import { SignupResponse } from '../models/signup-response'
import { LoginRequest } from '../models/login-request'
import { LoginResponse } from '../models/login-response'
import { NgxPermissionsService } from 'ngx-permissions'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authUrl = 'http://173.249.40.235:5005/api/User'

  constructor(
    private http: HttpClient,
    private permissionsService: NgxPermissionsService
  ) {}

  signup(
    signupRequest: SignupRequest,
    isAdmin: boolean = false
  ): Observable<SignupResponse> {
    const url = isAdmin
      ? `${this.authUrl}/CreateAdminUser()`
      : `${this.authUrl}/SignUp()`
    return this.http.post<SignupResponse>(url, signupRequest).pipe(
      tap((response) => {
        localStorage.setItem('signupEmail', signupRequest.Email)
        localStorage.setItem('signupPassword', signupRequest.Password)
        const roles = isAdmin ? ['ADMIN'] : ['USER']
        this.permissionsService.loadPermissions(roles)
      })
    )
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.authUrl}/Login()`, loginRequest)
      .pipe(
        tap((response) => {
          localStorage.setItem('loginEmail', loginRequest.Username)
          localStorage.setItem('loginPassword', loginRequest.Password)
          localStorage.setItem('accessToken', response.Login.AccessToken)
          localStorage.setItem('refreshToken', response.Login.RefreshToken)

          const roles = response.Login.Scope.split(' ')
          this.permissionsService.loadPermissions(roles)
        })
      )
  }

  logout(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('email')
    localStorage.removeItem('password')
    this.permissionsService.flushPermissions()
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken')
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken')
  }
}
