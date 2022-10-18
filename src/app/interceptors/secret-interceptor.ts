import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { BackendService } from '../services/backend.service'

@Injectable()
export class SecretInterceptor implements HttpInterceptor {

    constructor(
        private _backend: BackendService,
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Authorization')) {
            req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${this._backend.backend.secret}`) })
        }
        return next.handle(req)
    }
}
