import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GtagService {

    private $gtag: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

    private get gtag(): any {
        return this.$gtag.getValue();
    }

    private set gtag(ref: any) {
        this.$gtag.next(ref);
    }

    constructor() {
    }

    public initGTag(): void {
        if (window['gtag']) {
            if (environment.production) {
                this.gtag = window['gtag'];
                console.info('gtag manager installed');
            }
        } else {
            console.info('No google tag manager detected');
        }
    }

    public trackEvent(action: string, value: number = 1): void {
        if (environment.production) {
            this.gtag('event', action, {value});
        }
    }

}
