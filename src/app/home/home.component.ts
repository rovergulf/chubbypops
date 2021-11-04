import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../shared/services';
import { AlertService } from 'ngx-slice-kit';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        private web3: Web3Service,
        private alerts: AlertService,
    ) {
    }

    mint(): void {
        this.alerts.error({
            title: `Work in progress`,
            message: `WIP: Sale is not started yet!`
        });
    }

    ngOnInit(): void {
    }

}
