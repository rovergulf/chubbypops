import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-rarity',
    templateUrl: './rarity.component.html',
    styleUrls: ['./rarity.component.scss']
})
export class RarityComponent implements OnInit {

    rares = [{
        name: 'Common Chick',
        image: '415ea61b49bb6d5371083ba15f10e632ceb110712f162fcdccaab20c148511e2.gif',
        rarity: 'none',
        state: '/assets/images/pops2.svg',
        props: [{
            name: 'Background',
            value: 'Simple'
        }, {
            name: 'Body',
            value: 'Simple'
        }, {
            name: 'Legs',
            value: 'Simple'
        }, {
            name: 'Eyes',
            value: 'Simple'
        }, {
            name: 'Beak',
            value: 'Simple'
        }, {
            name: 'Pants',
            value: ''
        }, {
            name: 'Neck',
            value: ''
        }, {
            name: 'Hats',
            value: ''
        }]
    }, {
        image: '415ea61b49bb6d5371083ba15f10e632ceb110712f162fcdccaab20c148511e2.gif',
        props: [],
        rarity: 0
    }, {
        image: '415ea61b49bb6d5371083ba15f10e632ceb110712f162fcdccaab20c148511e2.gif',
        props: [],
        rarity: 0
    }, {
        image: '415ea61b49bb6d5371083ba15f10e632ceb110712f162fcdccaab20c148511e2.gif',
        props: [],
        rarity: 0
    }];

    currentChubby: any;

    constructor() {
    }

    getImageUrl(src: string): string {
        return `${environment.cdn}/images/${src}`;
    }

    ngOnInit(): void {
        this.currentChubby = this.rares[0];
    }

}
