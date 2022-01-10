import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { GtagService, WalletConnectService, Web3Service } from '../../shared/services';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import WalletConnect from '@walletconnect/client';
import { AlertService, DialogService } from 'ngx-slice-kit';

import { GetTokensComponent } from '../../shared/components/get-tokens/get-tokens.component';
import { SelectWalletComponent } from '../../shared/components/select-wallet/select-wallet.component';

@Component({
    selector: 'app-minter',
    templateUrl: './minter.component.html',
    styleUrls: ['./minter.component.scss']
})
export class MinterComponent implements OnInit, OnDestroy {

    private sub: Subscription;


    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private web3: Web3Service,
        private wc: WalletConnectService,
        private alerts: AlertService,
        private dialog: DialogService,
        private gtag: GtagService,
    ) {
    }

    initProvider(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.dialog.showDialog(SelectWalletComponent).subscribe({
                next: (res: any) => {
                    // ...
                    const {
                        provider
                    } = res;
                    if (provider === 'Ethereum') {
                        // window ethereum provider installed
                        this.mint();
                        this.gtag.trackEvent('provider_select_mm');
                    } else if (provider === 'WalletConnect') {
                        //
                        this.mint();
                        this.gtag.trackEvent('provider_select_wc');
                    } else {
                        this.gtag.trackEvent('provider_select_cancel');
                    }
                }
            });
        }
    }

    mint(): void {
        if (!this.web3.currentAccount && !this.wc.currentAccount) {
            this.initProvider();
            return;
        }

        if (!this.web3.eth) {
            this.alerts.error({
                title: `Eth wallet is required`,
                message: `Install MetaMask browser extension at first`,
                positionX: 'center',
            });
            this.gtag.trackEvent('no_web3_provider');
        } else {
            this.dialog.showDialog(GetTokensComponent).subscribe({
                next: (res: any) => {
                    // ...
                }
            });
            this.gtag.trackEvent('mint_open');
        }
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

}
