import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserProfileService } from '../../services/user-profile.service'
import { Observable } from 'rxjs'
import { Store, select } from '@ngrx/store'
import { selectLoginResponse } from '../../../../core/auth/state-management/login.selectors'
import { Router } from '@angular/router'
import { iGetProfileResponse } from '../../models/iGetProfileResponse'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup
  profileImage$: Observable<string> = this.userProfileService.profileImage$
  accessToken: string | undefined
  refreshToken: string | undefined
  isImageHovered = false

  @ViewChild('imageUpload', { static: false }) imageUploadElement!: ElementRef

  constructor(
    private fb: FormBuilder,
    private userProfileService: UserProfileService,
    private store: Store,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      firstName: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }],
      password: ['', Validators.required],
      phoneNumber: [''],
    })
  }

  ngOnInit(): void {
    const storedPassword = localStorage.getItem('loginPassword') || ''
    const localProfile = this.userProfileService.loadUserProfileFromLocal()

    if (localProfile) {
      this.userForm.patchValue({
        firstName: localProfile.Firstname,
        lastName: localProfile.Lastname,
        email: localProfile.Email,
        password: storedPassword,
        phoneNumber: localProfile.Institution || '+961',
      })
    } else {
      this.store
        .pipe(select(selectLoginResponse))
        .subscribe((loginResponse) => {
          if (loginResponse) {
            this.accessToken = loginResponse.Login.AccessToken
            this.refreshToken = loginResponse.Login.RefreshToken
            this.userProfileService
              .getUserProfile(this.accessToken)
              .subscribe((data: iGetProfileResponse) => {
                this.userForm.patchValue({
                  firstName: data.Firstname,
                  lastName: data.Lastname,
                  email: data.Email,
                  password: storedPassword,
                  phoneNumber: data.Institution || '',
                })
                this.userProfileService.saveUserProfileToLocal(data)
              })
          }
        })
    }
  }

  onHoverImage(): void {
    this.isImageHovered = true
  }

  onLeaveImage(): void {
    this.isImageHovered = false
  }

  isDefaultImage(): boolean {
    return (
      this.userProfileService.getProfileImageFromStorage() ===
      'assets/avatar.png'
    )
  }

  onImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        this.userProfileService.setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  onDeleteImage(): void {
    this.userProfileService.setProfileImage('assets/avatar.png')
  }

  onUploadClick(): void {
    if (this.imageUploadElement && this.imageUploadElement.nativeElement) {
      this.imageUploadElement.nativeElement.click()
    } else {
      console.error('Image upload element not found')
    }
  }

  onSaveChanges(): void {
    if (this.userForm.valid) {
      const newPassword = this.userForm.get('password')?.value
      const oldPassword = localStorage.getItem('loginPassword')

      if (newPassword && oldPassword && newPassword !== oldPassword) {
        this.userProfileService
          .changePasswordWithTokenRefresh(oldPassword, newPassword)
          .subscribe({
            next: () => {
              localStorage.setItem('userPassword', newPassword)
              localStorage.setItem('loginPassword', newPassword)
            },
            error: (error) => {
              console.error('Password update failed:', error)
            },
          })
      }
    }
  }

  onSignOut(): void {
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
