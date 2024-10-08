import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserProfileService } from '../../services/user-profile.service'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import * as bcrypt from 'bcryptjs'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup
  profileImage$: Observable<string> = this.userProfileService.profileImage$
  isImageHovered = false
  passwordVisible = false

  @ViewChild('imageUpload', { static: false }) imageUploadElement!: ElementRef

  constructor(
    private fb: FormBuilder,
    private userProfileService: UserProfileService,
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
    this.userProfileService.getUserProfile().then(async (userInfo) => {
      if (userInfo) {
        this.userForm.patchValue({
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          password: userInfo.password,
          phoneNumber: userInfo.phoneNumber,
        })

        await this.userProfileService.loadProfileImage()
      }
    })

    this.profileImage$ = this.userProfileService.profileImage$
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible
    const passwordField = document.getElementById(
      'password'
    ) as HTMLInputElement
    passwordField.type = this.passwordVisible ? 'text' : 'password'
  }

  onHoverImage(): void {
    this.isImageHovered = true
  }

  onLeaveImage(): void {
    this.isImageHovered = false
  }

  isDefaultImage(): boolean {
    const defaultImage = 'assets/avatar.png'
    let currentImage = ''
    this.profileImage$.subscribe((image) => (currentImage = image))
    return currentImage === defaultImage
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

      const newPhoneNumber = this.userForm.get('phoneNumber')?.value
      if (newPhoneNumber) {
        this.userProfileService
          .updatePhoneNumber(newPhoneNumber)
          .catch((error) => {
            console.error('Failed to update phone number:', error)
          })
      }
    }
  }

  onSignOut(): void {
    this.userProfileService.clearProfileData()
    this.router.navigate(['/login'])
  }
}
