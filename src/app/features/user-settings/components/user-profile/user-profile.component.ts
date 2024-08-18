// import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
// import { FormBuilder, FormGroup, Validators } from '@angular/forms'
// import { UserProfileService } from '../../services/user-profile.service'
// import { Observable } from 'rxjs'
// import { Router } from '@angular/router'

// @Component({
//   selector: 'app-user-profile',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.scss'],
// })
// export class UserProfileComponent implements OnInit {
//   userForm: FormGroup
//   profileImage$: Observable<string> = this.userProfileService.profileImage$
//   isImageHovered = false

//   @ViewChild('imageUpload', { static: false }) imageUploadElement!: ElementRef

//   constructor(
//     private fb: FormBuilder,
//     private userProfileService: UserProfileService,
//     private router: Router
//   ) {
//     this.userForm = this.fb.group({
//       firstName: [{ value: '', disabled: true }, Validators.required],
//       lastName: [{ value: '', disabled: true }, Validators.required],
//       email: [{ value: '', disabled: true }],
//       password: ['', Validators.required],
//       phoneNumber: [''],
//     })
//   }

//   ngOnInit(): void {
//     this.userProfileService.getUserProfile().then(async (userInfo) => {
//       const email = localStorage.getItem('loginEmail') || ''
//       if (userInfo) {
//         this.userForm.patchValue({
//           firstName: userInfo.firstName,
//           lastName: userInfo.lastName,
//           email: userInfo.email,
//           password: userInfo.password,
//           phoneNumber: userInfo.phoneNumber,
//         })

//         const profileImage =
//           await this.userProfileService.getProfileImageFromStorage(email)
//         this.userProfileService.setProfileImage(profileImage)
//       }
//     })

//     this.profileImage$ = this.userProfileService.profileImage$
//   }

//   onHoverImage(): void {
//     this.isImageHovered = true
//   }

//   onLeaveImage(): void {
//     this.isImageHovered = false
//   }

//   async isDefaultImage(): Promise<boolean> {
//     const email = localStorage.getItem('loginEmail') || ''
//     const profileImage =
//       await this.userProfileService.getProfileImageFromStorage(email)
//     return profileImage === 'assets/avatar.png'
//   }

//   onImageChange(event: Event): void {
//     const file = (event.target as HTMLInputElement).files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = () => {
//         this.userProfileService.setProfileImage(reader.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   onDeleteImage(): void {
//     this.userProfileService.setProfileImage('assets/avatar.png')
//   }

//   onUploadClick(): void {
//     if (this.imageUploadElement && this.imageUploadElement.nativeElement) {
//       this.imageUploadElement.nativeElement.click()
//     } else {
//       console.error('Image upload element not found')
//     }
//   }

//   onSaveChanges(): void {
//     if (this.userForm.valid) {
//       const newPassword = this.userForm.get('password')?.value
//       const oldPassword = localStorage.getItem('loginPassword')

//       if (newPassword && oldPassword && newPassword !== oldPassword) {
//         this.userProfileService
//           .changePasswordWithTokenRefresh(oldPassword, newPassword)
//           .subscribe({
//             next: () => {
//               localStorage.setItem('userPassword', newPassword)
//               localStorage.setItem('loginPassword', newPassword)
//             },
//             error: (error) => {
//               console.error('Password update failed:', error)
//             },
//           })
//       }
//     }
//   }

//   onSignOut(): void {
//     localStorage.clear()
//     this.router.navigate(['/login'])
//   }
// }
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserProfileService } from '../../services/user-profile.service'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup
  profileImage$: Observable<string> = this.userProfileService.profileImage$
  isImageHovered = false

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
    this.userProfileService.getUserProfile().then((userInfo) => {
      if (userInfo) {
        this.userForm.patchValue({
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          password: userInfo.password,
          phoneNumber: userInfo.phoneNumber,
        })

        const profileImage =
          this.userProfileService.getProfileImageFromStorage()
        this.userProfileService.setProfileImage(profileImage)
      }
    })

    this.profileImage$ = this.userProfileService.profileImage$
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
