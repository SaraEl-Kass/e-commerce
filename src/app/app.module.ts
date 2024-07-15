import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListingModule } from './features/product-listing/product-listing.module';
import { ProductDetailsModule } from './features/product-details/product-details.module';
import { UserSettingsModule } from './features/user-settings/user-settings.module';
import { AppShellModule } from './core/app-shell/app-shell.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProductListingModule,
    ProductDetailsModule,
    UserSettingsModule,
    AppShellModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
