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

    constructor() {
    }

    ngOnInit(): void {
    }

}
