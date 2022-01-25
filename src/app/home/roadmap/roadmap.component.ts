import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-roadmap',
    templateUrl: './roadmap.component.html',
    styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit {

    config = {
        arrows: true,
        offset: 32,
        slidesToScroll: 1,
        slidesToShow: 1,
        pauseByHover: true,
        infinity: true,
        timeout: 0
    };

    roadmap: any[] = [{
        point: '10%',
        image: '/assets/images/10.svg',
        content: [
            'Good deeds bank fills with 60% profits',
            'We will randomly airdrop Chubby Pops NFT to owners',
            'Discord server will be updated and staff will be expanded',
        ],
    }, {
        point: '25%',
        image: '/assets/images/25.svg',
        content: [
            'Good deeds bank fills with 60% profits',
            'Choosing a fund for donation by voting in discord and transfer of funds'
        ]
    }, {
        point: '50%',
        image: '/assets/images/50.svg',
        content: [
            'Good deeds bank fills with 60% profits',
            'Choosing a fund for donation by voting in discord and transfer of funds',
            'Drawing of 3 ETH among holders',
            'List collection on rarity.tools',
        ]
    }, {
        point: '75%',
        image: '/assets/images/75.svg',
        content: [
            'Good deeds bank fills with 60% profits',
            'Choosing a fund for donation by voting in discord and transfer of funds',
            'Exclusive NFTs will be raffled among owners',
        ]
    }, {
        point: '100%',
        image: '/assets/images/100.svg',
        content: [
            'Good deeds bank fills with 60% profits',
            'Choosing a fund for donation by voting in discord and transfer of funds',
            'Creators make themselves bird tattoos',
        ]
    }, {
        point: '???',
        image: '/assets/images/q.svg',
        content: [
            'We develop the community',
            'Launching new cool products',
            'And we try to make the world a little better together 😊',
        ]
    }];

    constructor() {
    }

    ngOnInit(): void {
    }

}
