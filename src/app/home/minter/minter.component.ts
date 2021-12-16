import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Web3Service } from '../../shared/services';
import { AlertService, DialogService } from 'ngx-slice-kit';
import { GetTokensComponent } from '../../shared/components/get-tokens/get-tokens.component';

@Component({
    selector: 'app-minter',
    templateUrl: './minter.component.html',
    styleUrls: ['./minter.component.scss']
})
export class MinterComponent implements OnInit {

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private web3: Web3Service,
        private alerts: AlertService,
        private dialog: DialogService,
    ) {
    }

    mint(): void {
        if (!this.web3.eth) {
            this.alerts.error({
                title: `Eth wallet is required`,
                message: `Install MetaMask browser extension at first`,
                positionX: 'center',
            });
        } else {
            const isMumbai = this.web3.network === '0x4';
            const isPolygon = this.web3.network === '0x89';
            if (isMumbai) {
                this.dialog.showDialog(GetTokensComponent).subscribe({
                    next: (res: any) => {
                        // ...
                    }
                });
            } else if (isPolygon) {
                this.dialog.showDialog(GetTokensComponent).subscribe({
                    next: (res: any) => {
                        // ...
                    }
                });
                // this.alerts.error({
                //     title: `Work in progress`,
                //     message: `WIP: Sale is not started yet!`
                // });
            } else {
                this.alerts.error({
                    title: `Work in progress`,
                    message: `WIP: Sale is not started yet!`
                });
            }
        }
    }

    ngOnInit(): void {
    }

}
