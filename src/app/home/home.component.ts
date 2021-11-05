import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../shared/services';
import { AlertService } from 'ngx-slice-kit';
import { environment } from '../../environments/environment';

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


    ngOnInit(): void {
    }

}
