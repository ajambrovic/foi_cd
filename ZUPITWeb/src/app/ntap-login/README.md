# NTAP login component

## Prerequisites

The project requires `angular` and `primeng` packages.

## Table of Contents

- [Installation](#installation)
- [Troubleshooting](#troubleshooting)
- [Usage](#usage)
- [Contribute](#contribute)
- [Changelog](#changelog)

## Installation

```javascript
// set npm to pull from our local npm repository
npm set registry http://192.168.214.63:9003 
// pull the package and save it in your package.json
npm install --save ntap-login
// in case this disconnects/hangs up, it's most probably a proxy problem, in that case
// remove the command line/Windows environment variable HTTP_PROXY. 
// you can check if the connection is working by using bash shell (like the one that comes with Git) and
curl http://192.168.214.63:9003/ntap-login
```

## Troubleshooting
1. Detailed steps description can be found at https://www.sitepoint.com/private-npm-packages-verdaccio/
2. If there's a problem with repository access (pulling or pushing), it's most probably due to proxy settings (I've had to remove my `HTTP_PROXY` environment variable / `proxy` variable in `.npmrc` ).
3. The repository should also pull regular npm packages, in case of issues you can revert to using the regular npm repository with `npm set registry http://registry.npmjs.org`

## Usage

To configure the component modify your `environment.ts` or `environment.prod.ts`

```javascript
// import the package
import {NTAPLoginModule} from 'ntap-login/ntap-login.module';
// and add the call to imports array
NTAPLoginModule.forRoot()
// add the component configuration in your environment variable(s)
import { OpaqueToken } from '@angular/core';
import { INTAPLoginConfig } from 'ntap-login/intap-login.config';

....

export let LOGIN_CONFIG = new OpaqueToken('login.config');

export const NTAPLoginConfig: INTAPLoginConfig = {
    logoSource: "/assets/logo.png",
    authenticationEndpointAuthenticate: 'http://192.168.214.61:8080/authenticate',
    authenticationEndpointLogout: 'http://192.168.214.61:8080/logout',
    authenticationEndpointChangePassword: 'http://192.168.214.61:8080/changePassword',
    credentialsExpiredCode: "403.3"
};
```

Configure a provider for the injected configuration in your `app.module.ts`

```javascript
// inject the LOGIN_CONFIG into your providers
providers: [
    ....
    { provide: LOGIN_CONFIG, useValue: NTAPLoginConfig}
    ....
]
```

You can now use the login component in your routes

```javascript
import { NTAPLoginComponent } from 'ntap-login/view/ntap-login.component';
import { AuthGuard } from 'ntap-login/service/auth-guard.service';

export const routes: Routes = [
    { path: 'login', component: NTAPLoginComponent }
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]}
];

```
## Contribute

In order to contribute, you need to

1. Checkout the NTAP repository (https://192.168.214.63/git/ntap.git)
2. Make changes in the NTAPWeb project (WebContent/src/login)
3. Update the version in package.json (SemVer)
4. Log in to the repository with `npm adduser` or `npm adduser --registry http://192.168.214.63:9003/` and after that just follow the prompts on the command line.
5. `npm publish`


## Changelog

#### 2.3.1 - Added function to set the necessary variable for setting loggedInUsername after browser refresh
#### 2.3.0 - Removed id, cleaned up auth service methods
#### 2.2.3 - Added id to submit button for e2e tests
#### 2.2.2 - Set loading the default route on login (since we don't have permissions checking on the frontend)
#### 2.2.1 - Removed unused class (moved to ntap-common)
#### 2.2.0 - Added missing changes
#### 2.1.0 - Updated change password process that conforms to the new backend approach 
#### 2.0.1 - Re-published version with fix for auth service
#### 2.0.0 - Renaming modules and classes
#### 1.3.6 - Fixed error message not showing when it didn't contain details
#### 1.3.5 - Fixed user name concatenation
#### 1.3.4 - Moved AuthRequestOptions to common module, formatting
#### 1.3.3 - Fixed backend errors not shown on changePassword
#### 1.3.2 - Added getLoggedInUser method to auth service
#### 1.3.1 - Merge 1.3.0 with 1.2.2
#### 1.3.0 - Added location removal on logout, cleaned up code
#### 1.2.2 - Removed password expiration notification
#### 1.2.1 - Edited Change Password option
#### 1.1.6 - Updated request options so they can be used with the POST request
#### 1.1.5 - Localization
#### 1.1.4 - Added back the getLoggedInUserName function
#### 1.1.3 - Removed localstorage user on logout even in case of error (e.g. server is unavailable)
#### 1.1.2 - Login component automatic logout bugfix
#### 1.1.1 - Observable operations imports bugfix
#### 1.1.0 - Removed default endpoint names, separated endpoints in configuration
#### 1.0.3 - Added AuthRequestOptions that can be used in place of RequestOptions
#### 1.0.2 - Session cookie setting bugfix
#### 1.0.1 - Error message display bugfix
#### 1.0.0 - Initial implementation