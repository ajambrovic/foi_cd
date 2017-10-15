import { Headers, BaseRequestOptions, URLSearchParams} from "@angular/http";

export class AuthRequestOptions extends BaseRequestOptions {
    constructor(params?: URLSearchParams) {
        super();
        this.withCredentials = true;
        this.headers = new Headers({'Content-Type':'application/json'});
        if (params) {
            this.params = params;
        }
    }
}