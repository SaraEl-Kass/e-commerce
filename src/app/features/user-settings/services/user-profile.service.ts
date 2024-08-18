import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs'
import { environment } from '../../../../environments/environment'
import { iGetProfileResponse } from '../models/iGetProfileResponse'
import { map, tap, switchMap } from 'rxjs/operators'
import { jwtDecode } from 'jwt-decode'

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private profileUrl = `${environment.userApiUrl}GetProfile()`
  private changePasswordUrl = `${environment.userApiUrl}ChangePassword()`
  private profileImageSubject = new BehaviorSubject<string>(
    this.getProfileImageFromStorage()
  )
  private accessToken: string | null = localStorage.getItem('accessToken')
  private refreshToken: string | null = localStorage.getItem('refreshToken')

  profileImage$: Observable<string> = this.profileImageSubject.asObservable()

  constructor(private http: HttpClient) {
    this.accessToken = localStorage.getItem('accessToken')
  }

  // Fetch user profile from the server
  getUserProfile(accessToken: string): Observable<iGetProfileResponse> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    )
    return this.http.get<iGetProfileResponse>(this.profileUrl, { headers })
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const url = `${this.changePasswordUrl}?oldPassword=${oldPassword}`
    const body = { newPassword }
    const headers = { Authorization: `Bearer ${this.accessToken}` }

    return this.http.post(url, body, { headers })
  }

  refreshAccessToken(): Observable<string> {
    const url = `${environment.userApiUrl}RefreshToken()`
    const body = { RefreshToken: this.refreshToken }

    return this.http.post<{ accessToken: string }>(url, body).pipe(
      map((response: { accessToken: string }) => response.accessToken),
      tap((newAccessToken: string) => {
        localStorage.setItem('accessToken', newAccessToken)
        this.accessToken = newAccessToken
      })
    )
  }

  changePasswordWithTokenRefresh(
    oldPassword: string,
    newPassword: string
  ): Observable<any> {
    if (this.isTokenExpired()) {
      return this.refreshAccessToken().pipe(
        switchMap(() => this.changePassword(oldPassword, newPassword))
      )
    } else {
      return this.changePassword(oldPassword, newPassword)
    }
  }

  isTokenExpired(): boolean {
    const token = this.accessToken
    if (!token) {
      return true // If there's no token, consider it expired
    }

    const decodedToken: any = jwtDecode(token)
    const expirationTime = decodedToken.exp * 1000 // Convert to milliseconds
    const currentTime = new Date().getTime()

    return currentTime > expirationTime
  }

  // Set a new profile image and save it to localStorage
  setProfileImage(imageUrl: string): void {
    this.profileImageSubject.next(imageUrl)
    localStorage.setItem('profileImage', imageUrl)
  }

  // Get the current profile image from localStorage
  public getProfileImageFromStorage(): string {
    return localStorage.getItem('profileImage') || 'assets/avatar.png'
  }

  // Save user profile to localStorage
  saveUserProfileToLocal(profile: iGetProfileResponse): void {
    localStorage.setItem('userProfile', JSON.stringify(profile))
  }

  // Load user profile from localStorage
  loadUserProfileFromLocal(): iGetProfileResponse | null {
    const profile = localStorage.getItem('userProfile')
    return profile ? JSON.parse(profile) : null
  }

  // // Save changes to the user profile (to be implemented)
  // saveUserProfile(updatedUserData: iGetProfileResponse, accessToken: string): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
  //   // Assuming there's a PUT or POST endpoint to update user profile
  //   return this.http.post(`${environment.userApiUrl}UpdateProfile`, updatedUserData, { headers });
  // }

  // Logout
  // logout(token: string, refreshToken: string): Observable<any> {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   const body = { Token: token, RefreshToken: refreshToken };
  //   return this.http.post(this.logoutUrl, body, { headers });
  // }
}