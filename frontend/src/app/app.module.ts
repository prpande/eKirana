import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { CartModule } from './cart/cart.module';
import { ShopModule } from './shop/shop.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SplashComponent } from './components/splash/splash.component';
import { AuthService } from './user/services/auth.service';
import { LoggerService } from './shared/components/logger/services/logger.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './user/services/auth-interceptor.service';
import { RouterService } from './shared/services/router.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SplashComponent,
    PageNotFoundComponent
  ],
  imports: [
    SharedModule,
    UserModule,
    CartModule,
    ShopModule,
    MatToolbarModule
  ],
  providers: [
    AuthService, 
    LoggerService, 
    RouterService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
export const GlobalConstants = Object.freeze({
  IS_TEST_ENV: false
});
