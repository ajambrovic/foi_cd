import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule, MessagesModule } from 'primeng/primeng';

import { AuthService } from './service/auth.service';
import { AuthGuard } from './service/auth-guard.service';
import { NTAPLoginComponent } from './view/ntap-login.component';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MessagesModule],
    declarations: [NTAPLoginComponent],
    exports: [NTAPLoginComponent]
})
export class NTAPLoginModule {
    // we want to guarantee that only one instance of AuthService is added to the root module, even when lazy loaded
    // https://angular-2-training-book.rangle.io/handout/modules/feature-modules.html
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NTAPLoginModule,
            providers: [AuthService, AuthGuard]
        }
    }
}
