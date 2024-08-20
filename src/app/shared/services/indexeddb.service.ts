import { Injectable } from '@angular/core'
import { openDB, DBSchema } from 'idb'
import { BehaviorSubject } from 'rxjs'

interface MyDB extends DBSchema {
  cartItems: {
    key: number
    value: {
      id: number
      name: string
      price: number
      image: string
      quantity: number
    }
  }
  userInfo: {
    key: string // Using the user's email as the key
    value: {
      firstName: string
      lastName: string
      email: string
      password: string
      phoneNumber: string
      profileImage: string
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  private dbPromise = openDB<MyDB>('my-cart-db', 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('cartItems')) {
        db.createObjectStore('cartItems', {
          keyPath: 'id',
        })
      }
      if (!db.objectStoreNames.contains('userInfo')) {
        db.createObjectStore('userInfo')
      }
    },
  })

  private cartItemsSubject = new BehaviorSubject<any[]>([])
  cartItems$ = this.cartItemsSubject.asObservable()

  // Cart Methods
  async addToCart(product: {
    id: number
    name: string
    price: number
    image: string
  }): Promise<void> {
    const db = await this.dbPromise
    const existingItem = await db.get('cartItems', product.id)

    if (existingItem) {
      existingItem.quantity += 1
      await db.put('cartItems', existingItem)
    } else {
      await db.add('cartItems', { ...product, quantity: 1 })
    }
    this.refreshCartItems() // Refresh cart items after addition
  }

  async getCartItems(): Promise<any[]> {
    const db = await this.dbPromise
    const items = await db.getAll('cartItems')
    this.cartItemsSubject.next(items) // Update the observable
    return items
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<void> {
    const db = await this.dbPromise
    const item = await db.get('cartItems', id)

    if (item) {
      if (quantity > 0) {
        item.quantity = quantity
        await db.put('cartItems', item)
      } else {
        await db.delete('cartItems', id)
      }
      this.refreshCartItems() // Refresh cart items after update
    }
  }

  async removeFromCart(id: number): Promise<void> {
    const db = await this.dbPromise
    await db.delete('cartItems', id)
    this.refreshCartItems() // Refresh cart items after deletion
  }

  private async refreshCartItems(): Promise<void> {
    const db = await this.dbPromise
    const items = await db.getAll('cartItems')
    this.cartItemsSubject.next(items) // Update the observable
  }

  // User Info Methods
  async saveUserInfo(user: {
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber: string
    profileImage: string
  }): Promise<void> {
    const db = await this.dbPromise
    await db.put('userInfo', user, user.email) // Save user info with email as key
  }

  async getUserInfo(email: string): Promise<any> {
    const db = await this.dbPromise
    return await db.get('userInfo', email) // Retrieve user info by email
  }

  async removeUserInfo(email: string): Promise<void> {
    const db = await this.dbPromise
    await db.delete('userInfo', email) // Remove user info by email
  }

  async userInfoExists(email: string): Promise<boolean> {
    const db = await this.dbPromise
    const userInfo = await db.get('userInfo', email)
    return !!userInfo
  }
}

// import { Injectable } from '@angular/core'
// import { openDB, DBSchema } from 'idb'
// import { BehaviorSubject } from 'rxjs'

// interface MyDB extends DBSchema {
//   cartItems: {
//     key: [string, number] // Composite key of userEmail and product id
//     value: {
//       id: number
//       name: string
//       price: number
//       image: string
//       quantity: number
//       userEmail: string // Include userEmail in the cart item
//     }
//     indexes: { userEmail: string } // Define the index on userEmail
//   }
//   userInfo: {
//     key: string // Using the user's email as the key
//     value: {
//       firstName: string
//       lastName: string
//       email: string
//       password: string
//       phoneNumber: string
//       profileImage: string
//     }
//   }
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class IndexedDBService {
//   private dbPromise = openDB<MyDB>('my-cart-db', 2, {
//     upgrade(db) {
//       if (!db.objectStoreNames.contains('cartItems')) {
//         const cartItemsStore = db.createObjectStore('cartItems', {
//           keyPath: ['userEmail', 'id'], // Composite key of userEmail and product id
//         })
//         cartItemsStore.createIndex('userEmail', 'userEmail') // Index for querying by userEmail
//       }
//       if (!db.objectStoreNames.contains('userInfo')) {
//         db.createObjectStore('userInfo')
//       }
//     },
//   })

//   private cartItemsSubject = new BehaviorSubject<any[]>([])
//   cartItems$ = this.cartItemsSubject.asObservable()

//   // Cart Methods
//   async addToCart(product: {
//     id: number
//     name: string
//     price: number
//     image: string
//   }): Promise<void> {
//     const userEmail = localStorage.getItem('loginEmail')
//     const db = await this.dbPromise

//     const existingItem = await db.get('cartItems', [userEmail!, product.id])

//     if (existingItem) {
//       existingItem.quantity += 1
//       await db.put('cartItems', existingItem)
//     } else {
//       await db.add('cartItems', {
//         ...product,
//         quantity: 1,
//         userEmail: userEmail!,
//       })
//     }
//     this.refreshCartItems() // Refresh cart items after addition
//   }

//   async getCartItems(): Promise<any[]> {
//     const userEmail = localStorage.getItem('loginEmail')
//     const db = await this.dbPromise
//     const items = await db.getAllFromIndex('cartItems', 'userEmail', userEmail!)
//     this.cartItemsSubject.next(items) // Update the observable
//     return items
//   }

//   async updateCartItemQuantity(id: number, quantity: number): Promise<void> {
//     const userEmail = localStorage.getItem('loginEmail')
//     const db = await this.dbPromise
//     const item = await db.get('cartItems', [userEmail!, id])

//     if (item) {
//       if (quantity > 0) {
//         item.quantity = quantity
//         await db.put('cartItems', item)
//       } else {
//         await db.delete('cartItems', [userEmail!, id])
//       }
//       this.refreshCartItems() // Refresh cart items after update
//     }
//   }

//   async removeFromCart(id: number): Promise<void> {
//     const userEmail = localStorage.getItem('loginEmail')
//     const db = await this.dbPromise
//     await db.delete('cartItems', [userEmail!, id])
//     this.refreshCartItems() // Refresh cart items after deletion
//   }

//   private async refreshCartItems(): Promise<void> {
//     const userEmail = localStorage.getItem('loginEmail')
//     const db = await this.dbPromise
//     const items = await db.getAllFromIndex('cartItems', 'userEmail', userEmail!)
//     this.cartItemsSubject.next(items) // Update the observable
//   }

//   // User Info Methods
//   async saveUserInfo(user: {
//     firstName: string
//     lastName: string
//     email: string
//     password: string
//     phoneNumber: string
//     profileImage: string
//   }): Promise<void> {
//     const db = await this.dbPromise
//     await db.put('userInfo', user, user.email) // Save user info with email as key
//   }

//   async getUserInfo(email: string): Promise<any> {
//     const db = await this.dbPromise
//     return await db.get('userInfo', email) // Retrieve user info by email
//   }

//   async removeUserInfo(email: string): Promise<void> {
//     const db = await this.dbPromise
//     await db.delete('userInfo', email) // Remove user info by email
//   }

//   async userInfoExists(email: string): Promise<boolean> {
//     const db = await this.dbPromise
//     const userInfo = await db.get('userInfo', email)
//     return !!userInfo
//   }
// }
