import { Component, OnInit  } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { filter, debounceTime, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
//import { RecaptchaComponent } from 'ng-recaptcha';
import { ROUTE_ANIMATIONS_ELEMENTS  } from '../../../../core/core.module';
import { AuthActions, AuthState, getAuth, getAuthError } from '../../store';
 

@Component({
    selector: 'auth-signup',
  templateUrl: './signup.component.html',
    styleUrls: ['../auth-styles.scss'] 
})
export class SignupComponent implements OnInit {
    public error$: Observable<string>;
  mainform = this.fb.group({
    autosave: false,
    username: ['', [Validators.required]],
    password: ['', [Validators.required]], 
    confirmedPassword: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],  
    birthday: ['', [Validators.required]] 
  });

 

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private translate: TranslateService 
  ) {}

  ngOnInit() {
      
      //this.store.pipe(select(getAuth), take(1))
      //    .subscribe((auth) => {
      //        console.log(auth);
      //      this.mainform.patchValue(auth)
      //    });
      //this.error$ = this.store.pipe(select(getAuthError));
  }
 

 
 

    SubmitForm(data: any): void {
         console.log(data);
        let me = {
            name: data.value.name,
            email: data.value.email,
            password: data.value.password,
            confirmedPassword: data.value.confirmedPassword
        }
        if (data.value) {
            this.store.dispatch(new AuthActions.SignUp(me));
        }
    }

 
}
