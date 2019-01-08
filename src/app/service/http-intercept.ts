
import {tap} from 'rxjs/operators';
import { UtilityService } from './utility.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class HttpIntercept implements HttpInterceptor {

    constructor(private utilsService: UtilityService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        /*Resolve new headers*/
        const headers = new HttpHeaders();
       /*  if (req.url.indexOf('/assets/') < 0) {
            let token = window.localStorage.getItem('accessToken');
            let userId = window.localStorage.getItem('userId');
            if (token && token.length > 0 && token !== 'null') {
                headers = headers.set('token', token);
                headers = headers.set('userId', userId);
                headers = headers.set('lang', this.translateService.currentLang ? this.translateService.currentLang : 'pt');
            }
        } */

        /*Clone the request to add the new header.*/
        const authReq = req.clone({
            headers: headers
        });

        /*Send the newly created request*/
        return next.handle(authReq).pipe(tap(
            (resp: any) => {},
            (err: any) => {
                if (err instanceof HttpErrorResponse) {

                    switch (err.status) {
                        case 0 :
                            this.utilsService.toastr.errorToastr('Servidor fora do ar ou em endereço diferente');
                            break;
                        case 500 :
                            this.utilsService.toastr.errorToastr('Erro interno do servidor');
                            console.error(err);
                        break;
                        case 400 :
                            this.utilsService.toastr.errorToastr(err.error.message);
                            break;
                        case 404 :
                            this.utilsService.toastr.errorToastr(err.error.message ? err.error.message : 'Servidor não encontrado');
                            break;
                        case 409 :
                            this.utilsService.toastr.errorToastr(err.error.message);
                            break;
                        default :
                            this.utilsService.toastr.errorToastr('Error inesperado');
                            console.error(err);
                        break;
                    }
                }
        })) as any;
    }
}
