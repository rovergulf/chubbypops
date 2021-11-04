import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliceKitModule } from 'ngx-slice-kit';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

const moduleDeclarations = [
    HeaderComponent,
    FooterComponent
];

@NgModule({
    declarations: moduleDeclarations,
    exports: [
        ...moduleDeclarations,
        HttpClientModule,
        SliceKitModule,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        SliceKitModule,
    ],
    providers: [],
    schemas: []
})
export class SharedModule {
}
