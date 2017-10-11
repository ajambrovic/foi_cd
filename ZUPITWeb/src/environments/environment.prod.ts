// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

import { InjectionToken } from '@angular/core';

export const environment = {
  production: true,
  hmr: false,
  apiEndpoint: '/zupit/ntap',
  apiAdminEndpoint: '/zupit/admin',
  jptMoveEndpoint: '/zupit/admin/moveJptGroups',
  dateComponentFormat: 'd.m.yy',
  debounceDelay: 400,
  expirationDays: 7,
  growlMsgsDurationInMilliSecs: 3000,
  helpLinkURL: '/zupit/assets/help-reference/help.html',
  shouldShowCommentInput: true,
  textareaCols: 30,
  textareaRows: 5,
};
