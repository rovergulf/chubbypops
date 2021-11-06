import { Component, OnDestroy, OnInit } from '@angular/core';
import { Web3Service } from '../../services';
import { ethers } from 'ethers';
import { AlertService, PopupService } from 'ngx-slice-kit';

@Component({
    selector: 'app-get-tokens',
    templateUrl: './get-tokens.component.html',
    styleUrls: ['./get-tokens.component.scss']
})
export class GetTokensComponent implements OnInit, OnDestroy {

    contract?: ethers.Contract;

    constructor(
        public web3: Web3Service,
        private popup: PopupService,
        private alerts: AlertService,
    ) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

}
