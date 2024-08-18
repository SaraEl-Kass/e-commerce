import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './core/auth/components/login/login.component'
import { SignupComponent } from './core/auth/components/signup/signup.component'
import { AuthGuard } from './core/guards/auth.guard'
import { UserProfileComponent } from './features/user-settings/components/user-profile/user-profile.component'
import { AdminDashboardComponent } from './features/admin/components/admin-dashboard/admin-dashboard.component'
import { WishlistComponent } from './features/Components/wishlist/wishlist.component'
import { CartComponent } from './features/Components/cart/cart.component'

const routes: Routes = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'product-list',
    loadChildren: () =>
      import('./features/product-listing/product-listing.module').then(
        (m) => m.ProductListingModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'product-details/:id',
    loadComponent: () =>
      import(
        './features/product-details/components/product-details/product-details.component'
      ).then((m) => m.ProductDetailsComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'product-list',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
