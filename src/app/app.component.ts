import { Component, OnInit } from '@angular/core';
import { Web3Service } from './shared/services';
import { AlertService } from 'ngx-slice-kit';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        public web3: Web3Service,
        private alerts: AlertService
    ) {
    }

    ngOnInit(): void {
        this.web3.getAccounts().subscribe({
            next: (res: any) => {
                this.alerts.success({
                    message: `You are logged to Chubby Pops!`,
                    positionX: 'center',
                    positionY: 'bottom',
                });
            },
            error: (err: any) => {
                this.alerts.error({
                    message: 'Failed to authorize using Web3',
                    positionX: 'center',
                    positionY: 'bottom',
                });
            }
        });
    }

}
