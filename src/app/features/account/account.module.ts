import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LazyElementsModule } from '@angular-extensions/elements';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'; 
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';

import { AccountRoutingModule } from './account-routing.module'; 
import { AccountEffects } from './account.effects';
import { AuthEffects } from './store/auth.effects';
import { FEATURE_NAME, account_reducers } from './account.state';

import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    LazyElementsModule,
    SharedModule,
    AccountRoutingModule,
    StoreModule.forFeature(FEATURE_NAME, account_reducers),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    }),
    EffectsModule.forFeature([
        AccountEffects, AuthEffects
    ])
  ],
  declarations: [
      LayoutComponent, LoginComponent, SignupComponent, ResetPasswordComponent
  
  ],
  providers: []
})
export class AccountModule {
  constructor() {}
}