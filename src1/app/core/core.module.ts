import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import {  HttpClientModule,  HttpClient,  HTTP_INTERCEPTORS} from '@angular/common/http';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomRouterSerializer } from './store/router/router.state';
import { FormsModule } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; 
import { MissingTranslationHandler, TranslateModule, TranslateLoader, TranslateService, TranslateCompiler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//import { RecaptchaModule } from 'ng-recaptcha';
import { httpInterceptorProviders } from './interceptors';
import { FaIconLibrary,  FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { MATERIAL_MODULES_CORE } from '../shared/material.module';
import { JwtModule } from '@auth0/angular-jwt';

import {  ROUTE_ANIMATIONS_ELEMENTS,  routeAnimations} from './route.animations';

import { NotificationService } from './services/notification.service';
import { SettingEffects } from './store/setting/setting.effects';

import { selectSettingLanguage, selectEffectiveTheme, selectSettingStickyHeader } from './store/setting/setting.selectors';
import { faIconscore } from './constants';

import { FooterComponent } from '../shared/components/footer/footer.component'; 
import { AppState, reducers, selectRouterState  } from './store/app.state';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from '../../environments/environment';
import { Configuration } from './configuration';


import {
    AppErrorHandler, SnackbarService, TitleService, globalStoreService,
    LocalStorageService, AnimationsService, AuthGuardService
} from './services';
 


const SHARED_SERVICES: any[] = [globalStoreService,
    LocalStorageService, AnimationsService, NotificationService,
    AppErrorHandler, AuthGuardService, TitleService, SnackbarService
];

export {
    LocalStorageService, AnimationsService, NotificationService,
    AppErrorHandler, AuthGuardService, TitleService, SnackbarService, 
    routeAnimations, ROUTE_ANIMATIONS_ELEMENTS, 
    AppState,  
    selectRouterState,   selectEffectiveTheme,  selectSettingLanguage,  selectSettingStickyHeader
};

export function tokenGetter() { 
    try { 
        let token = localStorage.getItem('user_token'); 
        let _token = JSON.parse(token); 
        return _token ? _token.access_token : null;
    } catch (err) {
        console.log('NoTOKEN');
        return null;
    }
}


 

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,`${environment.i18nPrefix}/assets/i18n/`,'.json'
  );
}

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,
        FormsModule, //RecaptchaModule.forRoot(),
    // material
        MATERIAL_MODULES_CORE, 
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter 
            },
        }),
    // ngrx
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([ SettingEffects  ]),
    environment.production? [] : StoreDevtoolsModule.instrument({ name: 'AppZero'}),

    // 3rd party
    FontAwesomeModule,
        TranslateModule.forRoot({
            defaultLanguage: 'en',
              loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
              }
    })
  ],
    declarations: [FooterComponent],
    providers: [...SHARED_SERVICES,Configuration, httpInterceptorProviders, 
        { provide: ErrorHandler, useClass: AppErrorHandler },
        //{ provide: HTTP_INTERCEPTORS, useClass: JtwInterceptor, multi: true },
        { provide: RouterStateSerializer, useClass: CustomRouterSerializer },
       // {        provide: APP_INITIALIZER, useFactory: initStore, deps: [Store], multi: true  }
  ],
    exports: [FormsModule, FooterComponent, MATERIAL_MODULES_CORE,  // RecaptchaModule,
             FontAwesomeModule, TranslateModule]
})
export class CoreModule {
  constructor(   @Optional()    @SkipSelf()    parentModule: CoreModule, faIconLibrary: FaIconLibrary  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
      faIconLibrary.addIcons(...faIconscore);
  }
}

export function initStore(store: Store<AppState>) {
    console.log('INIT STORE MODULE ...');
    return () => new Promise(resolve => {
        resolve(true);
        //store.dispatch(authAction.getUser());

        //store.pipe(
        //    select(authSelect.isInitialized),
        //    filter((isInitialized: boolean) => isInitialized),
        //    take(1),
        //).subscribe(() => {
        //    console.log('INIT STORE MODULE DONE');
        //    resolve(true);
        //});
    });
}