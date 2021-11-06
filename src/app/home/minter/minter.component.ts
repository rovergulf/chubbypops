import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Web3Service } from '../../shared/services';
import { AlertService } from 'ngx-slice-kit';

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
            this.alerts.error({
                title: `Work in progress`,
                message: `WIP: Sale is not started yet!`
            });
        }
    }

    ngOnInit(): void {
    }

}
