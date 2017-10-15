import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Message } from 'primeng/primeng';

import { AuthService } from '../service/auth.service';
import { INTAPLoginConfig } from '../intap-login.config';
import { LOGIN_CONFIG } from 'environments/environment';


@Component({
    selector: 'app-login',
    templateUrl: './ntap-login.component.html'
})
export class NTAPLoginComponent implements OnInit {

    loginForm: FormGroup;
    changePasswordForm: FormGroup;

    msgs: Message[] = [];

    showChangePassword: Boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        @Inject(LOGIN_CONFIG) private config: INTAPLoginConfig,
        fb: FormBuilder
    ) {
        this.loginForm = fb.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });

        this.changePasswordForm = fb.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required],
            'newPassword': ['', Validators.required],
            'newPasswordRetype': ['', Validators.required],
        }, { validator: this.areEqual });
    }

    ngOnInit() {
        if (this.authService.isUserLoggedIn()) {
            // reset login status
            this.authService.logout();
        }
    }

    onLoginSubmit(event, value: any) {
        // redirect only after sucessful login
        event.preventDefault();
        this.authService.login(value).subscribe(
            (isUserLoggedIn) => {
                if (isUserLoggedIn) {
                    this.router.navigate(['/']);
                }
            },
            error => this.showError(error));
    }

    areEqual = (control: AbstractControl): { [key: string]: boolean } => {
        const newPassword = control.get('newPassword');
        const newPasswordRetype = control.get('newPasswordRetype');
        if (!newPassword || !newPasswordRetype) { return null; };
        return newPassword.value === newPasswordRetype.value ? null : { nomatch: true };
    }

    showError(error: any) {
        this.msgs = [];
        let errorMessage = error; // "Internal Server Error"
        if (error.details && error.details.description) {
            errorMessage = error.details.description;
        }
        this.msgs.push({ severity: 'error', summary: 'Greška', detail: errorMessage });
        if (error.status === 401 && error.details.code === this.config.credentialsExpiredCode) {
            this.showChangePassword = true;
        }
    }

}
