import { Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'app-roadmap',
    templateUrl: './roadmap.component.html',
    styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit {

    currentWidth: number = 0;

    @HostListener('window:resize', ['$event'])
    onWindowResize(event: any): void {
        this.currentWidth = event.target.innerWidth;
    }

    config = {
        arrows: true,
        offset: 0,
        slidesToScroll: 1,
        slidesToShow: 1,
        pauseByHover: true,
        infinity: true,
        timeout: 0
    };

    roadmap: any[] = [{
        point: '10%',
        image: '/assets/images/10.svg',
        content: ['We will randomly airdrop Chubby Pops NFT to owners'],
    }, {
        point: '25%',
        image: '/assets/images/25.svg',
        content: [
            'Good deeds bank fills with 5 ETH',
            'Exclusive NFTs will be raffled among community members',
            'Discord server will be updated and staff will be expanded'
        ]
    }, {
        point: '50%',
        image: '/assets/images/50.svg',
        content: [
            'Good deeds bank fills with 10 ETH',
            'We develop merchandise and give away it among the community.',
            'We are looking for a team for collaboration',
        ]
    }, {
        point: '75%',
        image: '/assets/images/75.svg',
        content: [
            'Good deeds bank fills with 15 ETH',
            'Exclusive NFTs will be raffled among community members',
            'We make a choice of direction for donations together with the community',
        ]
    }, {
        point: '100%',
        image: '/assets/images/100.svg',
        content: [
            'We add 20 ETH more to the good deeds bankand transfer it to the selected charity',
            'Rare NFTs will be raffled among community members',
            'Creators make themselves bird tattoos',
        ]
    }, {
        point: '???',
        image: '/assets/images/q.svg',
        content: [
            'All along the way we will listen to the community to be better. ' +
            'As a bird that learns new words every day we want to grow and progress ' +
            'to make our voices heard by millions of people around the world. ' +
            'And this is impossible without you!',
        ]
    }];

    constructor() {
    }

    ngOnInit(): void {
    }

}
