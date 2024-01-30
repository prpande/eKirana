import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { ShopModule } from './shop/shop.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SplashComponent } from './components/splash/splash.component';
import { AuthService } from './user/services/auth.service';
import { LoggerService } from './shared/components/logger/services/logger.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SplashComponent
  ],
  imports: [
    SharedModule,
    UserModule,
    CartModule,
    ShopModule,
    MatToolbarModule
  ],
  providers: [AuthService, LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
