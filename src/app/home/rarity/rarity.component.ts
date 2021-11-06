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
        image: '/assets/images/chick_common.png',
        rarity: 'none',
        rarity_image: '/assets/images/frame_90.png',
        prop_image: '/assets/images/check.png',
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
        name: 'Rare Chick',
        image: '/assets/images/chick_rare.png',
        rarity: 'common',
        rarity_image: '/assets/images/frame_89.png',
        prop_image: '/assets/images/check.png',
        props: [{
            name: 'Background',
            value: 'Common'
        }, {
            name: 'Body',
            value: 'Common'
        }, {
            name: 'Legs',
            value: 'Common'
        }, {
            name: 'Eyes',
            value: 'Common'
        }, {
            name: 'Beak',
            value: 'Rare'
        }, {
            name: 'Pants',
            value: ''
        }, {
            name: 'Neck',
            value: 'Rare',
            rare: true,
        }, {
            name: 'Hats',
            value: 'Rare',
            rare: true
        }],
    }, {
        name: 'Legendary Chick',
        image: '/assets/images/chick_legendary.png',
        rarity: 'rare',
        rarity_image: '/assets/images/frame_87.png',
        prop_image: '/assets/images/check.png',
        props: [{
            name: 'Background',
            value: 'Legendary'
        }, {
            name: 'Body',
            value: 'Legendary',
        }, {
            name: 'Legs',
            value: 'Legendary'
        }, {
            name: 'Eyes',
            value: 'Legendary'
        }, {
            name: 'Beak',
            value: 'Legendary'
        }, {
            name: 'Pants',
            value: 'Legendary',
            rare: true,
        }, {
            name: 'Neck',
            value: 'Legendary',
            rare: true,
        }, {
            name: 'Hats',
            value: 'Legendary',
            rare: true,
        }],
    }, {
        name: 'Exclusive Chick',
        image: '/assets/images/chick_exclusive.png',
        rarity: 'super',
        rarity_image: '/assets/images/frame_88.png',
        prop_image: '/assets/images/question.png',
        props: [{
            name: 'Background',
            value: 'Exclusive',
            rare: true,
        }, {
            name: 'Body',
            value: 'Exclusive',
            rare: true,
        }, {
            name: 'Legs',
            value: 'Exclusive',
            rare: true,
        }, {
            name: 'Eyes',
            value: 'Exclusive',
            rare: true,
        }, {
            name: 'Beak',
            value: 'Exclusive',
            rare: true,
        }, {
            name: 'Pants',
            value: 'Exclusive',
            rare: true,
        }, {
            name: 'Neck',
            value: 'Exclusive',
            rare: true,
        }, {
            name: 'Hats',
            value: 'Exclusive',
            rare: true,
        }],
    }];

    currentIndex: number = 0;

    constructor() {
    }

    get currentChubby(): any {
        return this.rares[this.currentIndex];
    }

    getImageUrl(src: string): string {
        return `${environment.cdn}/images/${src}`;
    }

    get hasNext(): boolean {
        return this.currentIndex >= (this.rares.length - 1);
    }

    get hasPrev(): boolean {
        return this.currentIndex <= 0;
    }

    prev(): void {
        this.currentIndex = this.currentIndex === 0 ? this.rares.length : this.currentIndex - 1;
    }

    next(): void {
        this.currentIndex = this.currentIndex === this.rares.length - 1 ? 0 : this.currentIndex + 1;
    }

    ngOnInit(): void {
    }

}
