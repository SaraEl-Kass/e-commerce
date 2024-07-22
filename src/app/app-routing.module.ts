import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { NgxPermissionsGuard } from 'ngx-permissions';
// import { ProductListComponent } from './features/product-listing/components/product-list/product-list.component';
// import { SignupComponent } from './core/auth/components/signup/signup.component';
// import { LoginComponent } from './core/auth/components/login/login.component';
// import { AuthGuard } from './core/guards/auth.guard';

//  const routes: Routes = [
//    { path: 'login', component: LoginComponent },
//    { path: 'signup', component: SignupComponent },
//    { path: '', component: ProductListComponent, canActivate: [NgxPermissionsGuard], data: { permissions: { only: ['user', 'admin'], redirectTo: '/login' }} },
// //   { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
// //   { path: '', redirectTo: '/login', pathMatch: 'full' },
//  ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
