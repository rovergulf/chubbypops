import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, PopupService } from 'ngx-slice-kit';
import { ethers } from 'ethers';
import { Subscription } from 'rxjs';
import { Web3Service } from '../../services';
import { environment } from '../../../../environments/environment';

const singleFactoryItem = '415ea61b49bb6d5371083ba15f10e632ceb110712f162fcdccaab20c148511e2.gif';
const multipleFactoryItem = 'ed4e3013c5ef67963a2235a994cab3fafa0ed52e93faf7cec202c0d633fe23c8.gif';
const mintPrice = .0400000000000;

@Component({
    selector: 'app-get-tokens',
    templateUrl: './get-tokens.component.html',
    styleUrls: ['./get-tokens.component.scss']
})
export class GetTokensComponent implements OnInit, OnDestroy {

    @Output() resultEvent: EventEmitter<any> = new EventEmitter<any>();

    sub?: Subscription;
    form?: FormGroup;
    contract?: ethers.Contract;
    loading: boolean = false;
    tx: any;
    amount: number = 1;
    ethValue: number = mintPrice;

    constructor(
        public web3: Web3Service,
        private popup: PopupService,
        private alerts: AlertService,
        private http: HttpClient,
        private fb: FormBuilder,
    ) {
    }

    get factoryImage(): string {
        return `${environment.cdn}/images/${this.amount > 1 ? multipleFactoryItem : singleFactoryItem}`;
    }

    get txUrl(): string {
        const networkPrefix = this.web3.network === `0x3` ? 'ropsten.etherscan.io' :
            this.web3.network === `0x4` ? 'rinkeby.etherscan.io' : 'etherscan.io';
        return `https://${networkPrefix}/tx/${this.tx.hash}`;
    }

    getContractFactory(): void {
        if (this.loading) {
            return;
        }

        this.loading = true;

        this.http.get(environment.apiUrl).subscribe({
            next: (res: any) => {
                console.log(res);
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

    async contractCall(recipient: string, amount: number, rewrite?: any) {
        return await this.contract!.mint(recipient, amount, rewrite);
    }

    mint(): void {
        if (this.loading) {
            return;
        }

        this.loading = true;

        // this amount is added due not enough ether sent error, seems it not
        const ethValue = this.ethValue + 0.00000000000000001;
        const value = ethers.utils.parseEther(ethValue.toString());
        console.log(value);
        this.contractCall(this.web3.currentAccount, this.amount, {value}).then((tx: any) => {
            this.alerts.success({message: `Tx '${tx.hash}' sent!`});
            this.tx = tx;
            this.loading = false;
        }).catch((err: any) => {
            this.alerts.error({message: err.error || err});
            this.loading = false;
        });
    }

    get minEthValue(): number {
        return this.amount * mintPrice;
    }

    get canIncrease(): boolean {
        return this.amount >= 10;
    }

    get canDecrease(): boolean {
        return this.amount <= 1;
    }

    increase(): void {
        this.amount++;
        this.ethValue = this.minEthValue;
    }

    decrease(): void {
        this.amount--;
        this.ethValue = this.minEthValue;
    }

    close(): void {
        this.resultEvent.emit();
    }

    ngOnInit(): void {
        this.getContractFactory();
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

}
