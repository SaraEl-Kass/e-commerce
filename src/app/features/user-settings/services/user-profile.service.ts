import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, BehaviorSubject, Subscription } from 'rxjs'
import { environment } from '../../../../environments/environment'
import { iGetProfileResponse } from '../models/iGetProfileResponse'
import { map, tap, switchMap } from 'rxjs/operators'
import { jwtDecode } from 'jwt-decode'
import { IndexedDBService } from '../../../shared/services/indexeddb.service'

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private profileUrl = `${environment.userApiUrl}GetProfile()`
  private changePasswordUrl = `${environment.userApiUrl}ChangePassword()`
  private profileImageSubject = new BehaviorSubject<string>('')
  private accessToken: string | null = localStorage.getItem('accessToken')
  private refreshToken: string | null = localStorage.getItem('refreshToken')
  private subscriptions: Subscription[] = []

  profileImage$: Observable<string> = this.profileImageSubject.asObservable()

  constructor(
    private http: HttpClient,
    private indexedDBService: IndexedDBService
  ) {}

  // Initialize state for a new session
  private initializeState(): void {
    this.profileImageSubject = new BehaviorSubject<string>('')
  }

  // Load the profile image from IndexedDB and emit it
  public async loadProfileImage(): Promise<void> {
    const email = localStorage.getItem('loginEmail')
    if (email) {
      const userInfo = await this.indexedDBService.getUserInfo(email)
      const profileImage = userInfo?.profileImage || 'assets/avatar.png'
      this.profileImageSubject.next(profileImage)
    } else {
      this.profileImageSubject.next('assets/avatar.png')
    }
  }

  // Fetch user profile from IndexedDB
  async getUserProfile(): Promise<any> {
    const email = localStorage.getItem('loginEmail')
    if (!email) {
      throw new Error('No email found for the current user.')
    }
    return await this.indexedDBService.getUserInfo(email)
  }

  // Fetch user profile from the API
  async getUserProfileFromAPI(
    accessToken: string
  ): Promise<iGetProfileResponse | undefined> {
    try {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${accessToken}`
      )
      const response = await this.http
        .get<iGetProfileResponse>(this.profileUrl, { headers })
        .toPromise()
      return response
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      return undefined
    }
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
      return true
    }

    const decodedToken: any = jwtDecode(token)
    const expirationTime = decodedToken.exp * 1000
    const currentTime = new Date().getTime()

    return currentTime > expirationTime
  }

  // Set a new profile image and save it to the database
  setProfileImage(imageUrl: string): void {
    // Only proceed if the new image is different from the current one
    if (this.profileImageSubject.getValue() !== imageUrl) {
      this.saveProfileImage(imageUrl)
        .then(() => {
          // Update the observable only if the save operation was successful
          this.profileImageSubject.next(imageUrl)
        })
        .catch((error) => {
          console.error('Failed to save profile image:', error)
        })
    }
  }

  private async saveProfileImage(imageUrl: string): Promise<void> {
    const email = localStorage.getItem('loginEmail')
    if (email) {
      const userInfo = await this.getUserProfile()
      if (userInfo.profileImage !== imageUrl) {
        // Double-check the image is actually different
        userInfo.profileImage = imageUrl
        await this.indexedDBService.saveUserInfo(userInfo)
      }
    }
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

  // Clear the profile data on logout
  public clearProfileData(): void {
    this.profileImageSubject.next('')
    localStorage.clear()

    // Unsubscribe from any existing subscriptions
    this.subscriptions.forEach((sub) => sub.unsubscribe())
    this.subscriptions = []
  }

  // Method to update phone number in IndexedDB
  async updatePhoneNumber(phoneNumber: string): Promise<void> {
    const email = localStorage.getItem('loginEmail')
    if (email) {
      const userInfo = await this.getUserProfile()
      if (userInfo) {
        userInfo.phoneNumber = phoneNumber
        await this.indexedDBService.saveUserInfo(userInfo)
      }
    }
  }
}
