import { Injectable, Inject } from '@angular/core';
import { Location } from '@angular/common/';
import { Http, Response, RequestMethod, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { INTAPLoginConfig } from '../intap-login.config';
import { LOGIN_CONFIG } from 'environments/environment';
import { AuthRequestOptions } from './auth-request-options';

/**
 * Authentication service that uses HTTP POST to transfer JSON credentials.
 *
 * By default supports session based authentication.
 *
 * The authentication API endpoint is configured by the environment.authenticationEndpoint property
 *
 * Authenticated user data is stored in local storage under the 'currentUser' key.
 *
 * Used endpoints:
 *
 * {environment.authenticationEndpointAuthenticate} - for processing the login
 *
 * {environment.authenticationEndpointLogout} - for destroying the session
 *
 * {environment.authenticationEndpointChangePassword} - for changing the password if expired
 *
 */
@Injectable()
export class AuthService {

    // this is used to redirect after a successful login
    redirectUrl: string;
    loggedInUsername: string;

    constructor(private http: Http, @Inject(LOGIN_CONFIG) private config: INTAPLoginConfig, private location: Location) { }

    login(value: {}): Observable<boolean> {
        const body = JSON.stringify(value);

        return this.http.post(`${this.config.authenticationEndpointAuthenticate}`, body, new AuthRequestOptions)
            .map((response: Response) => {
                const user = response.json();

                if (user === undefined) {
                    this._serverError({ details: { description: 'Nemoguće pristupiti - Niste prijavljeni' } });
                }
                this.loggedInUsername = this.getUsersName(user);

                // store locally to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                return true;
            })
            .catch(this._serverError);
    }

    getUsersName(user?) {
        if (!user) {
            user = this.getLoggedInUser();
            if (!user) {
                return null;
            }
        }
        return user.firstName.concat(' ', user.lastName);
    }

    setUsersName(){
        this.loggedInUsername = this.getUsersName();
    }

    logout(): void {
        this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        localStorage.removeItem('currentUser');
        this.loggedInUsername = null;
        this.http.post(`${this.config.authenticationEndpointLogout}`, {}).subscribe(
            success => { },
            error => this._serverError(error)
        );
    }

    changePassword(value: {}): Observable<boolean> {
        return this.http.post(`${this.config.authenticationEndpointChangePassword}`, value)
            .map((response: Response) => {
                const parsedResponse: boolean = response.json();
                return parsedResponse;
            })
            .catch(this._serverError);
    }

    isUserLoggedIn() {
        return (localStorage.getItem('currentUser')) ? true : false;
    }

    getLoggedInUser() {
        if (this.isUserLoggedIn()) {
            return JSON.parse(localStorage.getItem('currentUser'));
        }
        return null;
    }

    private _serverError(err: any) {
        if (err instanceof Response) {
            const error = err.json().error;
            return Observable.throw(error || { details: { description: 'Došlo je do greške na poslužitelju.' } });
        }
        return Observable.throw(err || 'Došlo je do greške na poslužitelju.');
    }
}
