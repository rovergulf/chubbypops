import { Component, HostListener, OnInit } from '@angular/core';
import { Web3Service } from '../shared/services';
import { AlertService } from 'ngx-slice-kit';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    team: any[] = [{
        name: 'Captain Disorder',
        role: 'Dev',
        twitter: 'https://twitter.com/rzkmonster',
        image: '/assets/images/team_dev.png'
    }, {
        name: 'LunaMorrra',
        role: 'Design',
        twitter: '',
        image: '/assets/images/team_design.png'
    }, {
        name: 'Acdvlr',
        role: 'Spiritual Leader',
        twitter: '',
        image: '/assets/images/team_leader.png'
    }];
    currentChubby: any = {
        name: 'Common Chick',
        image: '415ea61b49bb6d5371083ba15f10e632ceb110712f162fcdccaab20c148511e2.gif',
        props: [{
            name: 'Background',
            value: ''
        }, {
            name: 'Body',
            value: ''
        }, {
            name: 'Legs',
            value: ''
        }, {
            name: 'Eyes',
            value: ''
        }, {
            name: 'Beak',
            value: ''
        }, {
            name: 'Pants',
            value: ''
        }, {
            name: 'Neck',
            value: ''
        }, {
            name: 'Hats',
            value: ''
        }],
        rarity: 0
    };

    rares = [{
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
    }, {
        image: '415ea61b49bb6d5371083ba15f10e632ceb110712f162fcdccaab20c148511e2.gif',
        props: [],
        rarity: 0
    }];

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

    slides1: any[] = [];
    slides2: any[] = [];

    roadmapConfig = {
        arrows: true,
        offset: 0,
        slidesToScroll: 1,
        slidesToShow: 1,
        pauseByHover: true,
        infinity: false,
        timeout: 0
    };

    constructor(
        private web3: Web3Service,
        private alerts: AlertService,
    ) {
    }

    getImageUrl(src: string): string {
        return `${environment.cdn}/images/${src}`;
    }

    mint(): void {
        this.alerts.error({
            title: `Work in progress`,
            message: `WIP: Sale is not started yet!`
        });
    }

    ngOnInit(): void {
    }

}
