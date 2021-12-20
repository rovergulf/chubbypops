import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

    team: any[] = [{
        name: 'Captain Disorder',
        role: 'Dev',
        image: '/assets/images/team_dev.png',
        twitter: 'https://twitter.com/rzkmonster',
        email: 'mailto:d@rovergulf.net'
    }, {
        name: 'LunaMorrra',
        role: 'Design',
        image: '/assets/images/team_design.png',
        twitter: 'https://twitter.com/monsterlurks'
    }, {
        name: 'Acdvlr',
        role: 'Spiritual Leader',
        image: '/assets/images/team_leader.png',
        twitter: '',
        telegram: 'https://t.me/AmiranPolyanskiy'
    }];

    constructor() {
    }

    ngOnInit(): void {
    }

}
