import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CartService } from '../../services/cart.service'
import { UserProfileService } from '../../user-settings/services/user-profile.service'
import { MatDialog } from '@angular/material/dialog'
import { OrderConfirmationDialogComponent } from '../order-confirmation-dialog/order-confirmation-dialog.component'

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

  deliveryForm: FormGroup

  constructor(
    private cartService: CartService,
    private userProfileService: UserProfileService,
    private fb: FormBuilder,
    private dialog: MatDialog
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
    this.cartService.refreshCartItems()

    this.userProfileService.getUserProfile().then((userInfo) => {
      if (userInfo) {
        this.userName = `${userInfo.firstName} ${userInfo.lastName}`
        this.userEmail = userInfo.email
        this.userPhoneNumber = userInfo.phoneNumber

        this.deliveryForm.patchValue({
          name: this.userName,
          mobileNumber: this.userPhoneNumber,
          email: this.userEmail,
        })
      }
    })
  }

  async onSubmit(): Promise<void> {
    if (this.deliveryForm.valid) {
      const orderDetails = {
        ...this.deliveryForm.value,
        items: this.cartItems,
      }
      console.log('Order submitted:', orderDetails)

      await this.cartService.clearCart()
      console.log('Cart cleared')

      this.dialog.open(OrderConfirmationDialogComponent, {
        width: '400px',
        disableClose: true,
        enterAnimationDuration: '0ms',
        exitAnimationDuration: '0ms',
        backdropClass: 'custom-backdrop',
      })
    } else {
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

  getShipping(): number {
    const subtotal = this.getSubtotal()
    return this.cartItems.length > 0 && subtotal <= 100 ? 10 : 0
  }

  getTotal(): number {
    return this.getSubtotal() + this.getShipping()
  }
}
