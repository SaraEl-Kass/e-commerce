import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ProductDetailsModule } from './features/product-details/product-details.module';
import { UserSettingsModule } from './features/user-settings/user-settings.module';
import { AppShellModule } from './core/app-shell/app-shell.module';
import { AuthModule } from './core/auth/auth.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AgGridModule } from 'ag-grid-angular';
import { MyGridComponent } from './my-grid/my-grid.component';
import { ButtonRendererComponent } from './button-renderer/button-renderer.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { signupReducer } from './core/auth/state-management/signup.reducer';
import { SignupEffects } from './core/auth/state-management/signup.effects';
import { loginReducer } from './core/auth/state-management/login.reducer';
import { LoginEffects } from './core/auth/state-management/login.effects';
import { productReducer } from './features/product-listing/product-state/product.reducer';
import { ProductEffects } from './features/product-listing/product-state/product.effects';
import { SharedModule } from './shared/shared.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProductDetailsComponent } from './features/product-details/components/product-details/product-details.component';
import { AdminModule } from './features/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    MyGridComponent,
    ButtonRendererComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    // ProductDetailsModule,
    UserSettingsModule,
    AppShellModule,
    AuthModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    AgGridModule,
    StoreModule.forRoot({products: productReducer}), 
    StoreModule.forFeature('signup', signupReducer),
    StoreModule.forFeature('login', loginReducer),
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forRoot([ProductEffects]), 
    EffectsModule.forFeature([SignupEffects, LoginEffects, ProductEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true }),
    ProductDetailsComponent,
    AdminModule,
    UserSettingsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
