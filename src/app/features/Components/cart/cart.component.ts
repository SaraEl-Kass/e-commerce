// import { Component, OnInit } from '@angular/core'
// import { CartService } from '../../services/cart.service'
// import { UserProfileService } from '../../user-settings/services/user-profile.service'

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.scss'],
// })
// export class CartComponent implements OnInit {
//   cartItems: any[] = []
//   userName: string = ''
//   userEmail: string = ''
//   userPhoneNumber: string = ''

//   constructor(
//     private cartService: CartService,
//     private userProfileService: UserProfileService
//   ) {}

//   ngOnInit(): void {
//     this.cartService.cartItems$.subscribe((items) => {
//       this.cartItems = items
//     })
//     this.cartService.refreshCartItems() // Load initial cart items

//     // Load user profile data
//     this.userProfileService.getUserProfile().then((userInfo) => {
//       if (userInfo) {
//         this.userName = `${userInfo.firstName} ${userInfo.lastName}`
//         this.userEmail = userInfo.email
//         this.userPhoneNumber = userInfo.phoneNumber
//       }
//     })
//   }

//   async onProductRemoved(productId: number): Promise<void> {
//     await this.cartService.decreaseQuantity({ id: productId, quantity: 0 })
//     this.cartItems = this.cartItems.filter((item) => item.id !== productId)
//   }

//   async increaseQuantity(item: any): Promise<void> {
//     if (item.quantity < 10) {
//       await this.cartService.increaseQuantity(item)
//     }
//   }

//   async decreaseQuantity(item: any): Promise<void> {
//     await this.cartService.decreaseQuantity(item)
//   }

//   getSubtotal(): number {
//     return this.cartItems.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     )
//   }
// }

import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms' // Import necessary classes
import { CartService } from '../../services/cart.service'
import { UserProfileService } from '../../user-settings/services/user-profile.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = []
  userName: string = ''
  userEmail: string = ''
  userPhoneNumber: string = ''

  deliveryForm: FormGroup // Add a FormGroup property

  constructor(
    private cartService: CartService,
    private userProfileService: UserProfileService,
    private fb: FormBuilder // Inject FormBuilder
  ) {
    this.deliveryForm = this.fb.group({
      name: ['', Validators.required],
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^\\+?[0-9]{1,3}?[0-9]{8,14}$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      address: ['', Validators.required],
      date: ['', Validators.required],
      paymentMethod: ['cod', Validators.required],
    })
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items
    })
    this.cartService.refreshCartItems() // Load initial cart items

    // Load user profile data
    this.userProfileService.getUserProfile().then((userInfo) => {
      if (userInfo) {
        this.userName = `${userInfo.firstName} ${userInfo.lastName}`
        this.userEmail = userInfo.email
        this.userPhoneNumber = userInfo.phoneNumber

        // Set the loaded user information into the form controls
        this.deliveryForm.patchValue({
          name: this.userName,
          mobileNumber: this.userPhoneNumber,
          email: this.userEmail,
        })
      }
    })
  }

  onSubmit(): void {
    if (this.deliveryForm.valid) {
      // Proceed with order submission
      console.log('Order submitted:', this.deliveryForm.value)
    } else {
      // Highlight all form controls that are invalid
      this.deliveryForm.markAllAsTouched()
      console.log('Form is not valid:', this.deliveryForm.errors)
    }
  }

  async onProductRemoved(productId: number): Promise<void> {
    await this.cartService.decreaseQuantity({ id: productId, quantity: 0 })
    this.cartItems = this.cartItems.filter((item) => item.id !== productId)
  }

  async increaseQuantity(item: any): Promise<void> {
    if (item.quantity < 10) {
      await this.cartService.increaseQuantity(item)
    }
  }

  async decreaseQuantity(item: any): Promise<void> {
    await this.cartService.decreaseQuantity(item)
  }

  getSubtotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  }
}
