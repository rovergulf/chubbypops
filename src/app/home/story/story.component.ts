import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-story',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {

    roadmapConfig = {
        arrows: true,
        offset: 0,
        slidesToScroll: 1,
        slidesToShow: 1,
        pauseByHover: true,
        infinity: false,
        timeout: 0
    };

    constructor() {
    }

    ngOnInit(): void {
    }

}
