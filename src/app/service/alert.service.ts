/* import { Injectable, EventEmitter } from '@angular/core';
import { ToastrController } from 'ng2-toastr-notifications';

@Injectable()
export class AlertService {

    constructor(public toastCtrl: ToastrController) {
    }

    showSuccess(message: string) {
        this.toastCtrl.show({ type: 'success', title: 'Sucesso', message: message });
    }

    showError(res, message: string) {
        switch (res.status) {
            case 400:
                this.toastCtrl.show({ type: 'error', title: 'Error 400', message: message });
                break;
            case 401:
                this.toastCtrl.show({ type: 'error', title: 'Error 401', message: message });
                break;
            case 403:
                this.toastCtrl.show({ type: 'error', title: 'Error 403', message: message });
                break;
            case 404:
                this.toastCtrl.show({ type: 'error', title: 'Error 404', message: message });
                break;
            case 500:
                this.toastCtrl.show({ type: 'error', title: 'Internal error', message: message });
                break;
            case 504:
            case 0:
                this.toastCtrl.show({ type: 'error', title: 'Request timeout', message: message });
                break;
            default:
                this.toastCtrl.show({ type: 'error', title: 'Internal server error', message: message });
                break;
            }
    }
}
 */
