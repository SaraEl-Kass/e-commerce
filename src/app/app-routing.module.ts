import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './core/guards/auth.guard'
import { LayoutComponent } from './core/app-shell/layout/layout.component'

const routes: Routes = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./core/auth/auth.module').then((m) => m.AuthModule), // Lazy load Login & Signup
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
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
        path: '',
        loadChildren: () =>
          import('./features/features.module').then((m) => m.FeaturesModule), // Lazy load Cart & Wishlist
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'user-profile',
    loadChildren: () =>
      import('./features/user-settings/user-settings.module').then(
        (m) => m.UserSettingsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-dashboard',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
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
