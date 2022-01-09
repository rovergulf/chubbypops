import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AlertService, PopupService } from 'ngx-slice-kit';
import { ethers } from 'ethers';
import { GtagService, WalletConnectService, Web3Service } from '../../services';
import { environment } from '../../../../environments/environment';

const singleFactoryItem = '415ea61b49bb6d5371083ba15f10e632ceb110712f162fcdccaab20c148511e2.gif';
const multipleFactoryItem = 'ed4e3013c5ef67963a2235a994cab3fafa0ed52e93faf7cec202c0d633fe23c8.gif';

const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "currentTokenId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
];

@Component({
    selector: 'app-get-tokens',
    templateUrl: './get-tokens.component.html',
    styleUrls: ['./get-tokens.component.scss']
})
export class GetTokensComponent implements OnInit, OnDestroy {

    @Output() resultEvent: EventEmitter<any> = new EventEmitter<any>();

    loading: boolean = false;
    tx: any;
    isMetaMaskClient: boolean;
    buyer: string;
    signer: ethers.Signer;
    amount: number = 1;
    ethValue: number = 0;
    contract: ethers.Contract;
    currentTokenId: number = 0;

    constructor(
        public web3: Web3Service,
        public wc: WalletConnectService,
        private popup: PopupService,
        private alerts: AlertService,
        private gtag: GtagService,
    ) {
    }

    get factoryImage(): string {
        return `${environment.cdn}/images/${this.amount > 1 ? multipleFactoryItem : singleFactoryItem}`;
    }

    get txUrl(): string {
        const networkPrefix = this.web3.network === `0x4` ? 'rinkeby.etherscan.io' : 'polygonscan.com';
        return `https://${networkPrefix}/tx/${this.tx.hash}`;
    }

    async contractCall(recipient: string, amount: number, rewrite?: any) {
        return await this.contract.mint(recipient, amount, rewrite);
    }

    factoryLoaded(): boolean {
        return this.isMetaMaskClient && !!this.currentTokenId ||
            !!this.buyer;
    }

    mint(): void {
        if (this.loading) {
            return;
        }

        this.loading = true;

        this.signer.getBalance()
            .then((res: any) => {
                const balance = ethers.BigNumber.from(res);
                const value = ethers.utils.parseEther(this.ethValue.toString());
                if (balance.lt(value)) {
                    this.alerts.error({
                        title: 'Insufficient balance',
                        message: `Add more funds.`
                    });
                    this.gtag.trackEvent('mint_insufficient_funds');
                    return;
                }

                this.contractCall(this.buyer, this.amount, {value}).then((tx: any) => {
                    this.alerts.success({message: `Tx '${tx.hash}' sent!`});
                    this.tx = tx;
                    this.loading = false;
                    this.gtag.trackEvent('mint_tx_success');
                }).catch((err: any) => {
                    this.gtag.trackEvent('mint_tx_cancel');
                    this.alerts.error({message: err.message.substring(0, err.message.indexOf('(')) || err.message});
                    this.loading = false;
                });
            })
            .catch((err: any) => {
                this.alerts.error({message: err})
            });
    }

    get minEthValue(): number {
        return this.amount * (this.web3.network === '0x4' ? 0.02 : 40);
    }

    get canIncrease(): boolean {
        return this.amount >= 10;
    }

    get canDecrease(): boolean {
        return this.amount <= 1;
    }

    priceCaption(): string {
        return `Each token costs ${this.web3.network === '0x4' ? '0.02 Ether' : '40 Matic'} per mint`;
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
        this.isMetaMaskClient = this.web3.eth && this.web3.currentAccount;
        this.buyer = this.isMetaMaskClient ? this.web3.currentAccount : this.wc.currentAccount;
        this.signer = this.isMetaMaskClient ? this.web3.signer : this.wc.signer;
        this.ethValue = this.web3.network === '0x4' ? 0.02 : 40;
        const addresses: any = environment.contracts;
        this.contract = new ethers.Contract(addresses[this.web3.network], abi, this.signer);
        this.contract.currentTokenId().then((res: any) => {
            this.currentTokenId = ethers.BigNumber.from(res).toNumber();
        }).catch((err: any) => {
            this.alerts.error({
                message: err.message || err
            });
        });

    }

    ngOnDestroy(): void {
    }

}
