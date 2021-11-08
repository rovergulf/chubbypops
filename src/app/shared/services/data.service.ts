import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ethers } from 'ethers';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AlertService } from 'ngx-slice-kit';
import { Web3Service } from './web3.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private loading: boolean = false;
    private $contract: BehaviorSubject<ethers.Contract> = new BehaviorSubject<any>(null);

    get contract(): ethers.Contract {
        return this.$contract.getValue();
    }

    set contract(v: ethers.Contract) {
        this.$contract.next(v);
    }

    constructor(
        private http: HttpClient,
        private alerts: AlertService,
        private web3: Web3Service,
    ) {
    }

    loadContractFactory(): void {
        if (this.loading) {
            return;
        }

        this.loading = true;

        const env: any = environment.apiUrl;
        this.http.get(env[this.web3.network]).subscribe({
            next: (res: any) => {
                if (res.contract) {
                    const abi = JSON.parse(res.contract.abi);
                    this.contract = new ethers.Contract(environment.contract, abi, this.web3.signer);
                }
                this.loading = false;
            },
            error: (err: any) => {
                this.alerts.error({
                    message: err.error?.message || err.error
                });
                this.loading = false;
            }
        });
    }

}
