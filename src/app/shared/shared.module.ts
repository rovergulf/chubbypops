import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliceKitModule } from 'ngx-slice-kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { GetTokensComponent } from './components/get-tokens/get-tokens.component';
import { SelectWalletComponent } from './components/select-wallet/select-wallet.component';

const moduleDeclarations = [
    HeaderComponent,
    FooterComponent,
    GetTokensComponent,
    SelectWalletComponent,
];

@NgModule({
    declarations: moduleDeclarations,
    exports: [
        ...moduleDeclarations,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SliceKitModule,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SliceKitModule,
    ],
    providers: [],
    schemas: []
})
export class SharedModule {
}
