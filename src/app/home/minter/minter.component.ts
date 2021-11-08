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
            const isRopsten = this.web3.network === '0x3';
            const isRinkeby = this.web3.network === '0x4';
            if (isRopsten) {
                this.dialog.showDialog(GetTokensComponent).subscribe({
                    next: (res: any) => {
                        console.log(res);
                    }
                });
            } else if (isRinkeby) {} else {
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
