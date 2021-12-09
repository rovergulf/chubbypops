import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Web3Service } from './shared/services';
import { AlertService } from 'ngx-slice-kit';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        public web3: Web3Service,
        private alerts: AlertService
    ) {
    }

    ngOnInit(): void {
        // 08.12.2021 - Captain Disorder:
        // it is no longer needed, I think, cause mint interface is available only on OpenSea
        // as we use Factory interface for minting
        // but i'll keep it, cause we probably put in an OpenSea embeds

        // if (isPlatformBrowser(this.platformId)) {
        //     if (this.web3.eth) {
        //         this.web3.getAccounts().subscribe({
        //             next: (res: any) => {
        //                 this.alerts.success({
        //                     message: `You are logged to Chubby Pops!`,
        //                     positionX: 'center',
        //                     positionY: 'bottom',
        //                 });
        //             },
        //             error: (err: any) => {
        //                 this.alerts.error({
        //                     message: 'Failed to authorize using Web3',
        //                     positionX: 'center',
        //                     positionY: 'bottom',
        //                 });
        //             }
        //         });
        //     }
        // }
    }

}
