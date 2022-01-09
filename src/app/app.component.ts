import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { GtagService, WalletConnectService, Web3Service } from './shared/services';
import { AlertService } from 'ngx-slice-kit';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        public web3: Web3Service,
        private alerts: AlertService,
        private gtag: GtagService,
        private wc: WalletConnectService,
    ) {
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.web3.checkAndInstallWeb3();
            this.wc.installWalletConnect();
            this.gtag.initGTag();
        }
    }

    ngOnDestroy(): void {
        // do something
    }

}
