import { Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

    config = {
        arrows: false,
        offset: 0,
        slidesToScroll: 1,
        slidesToShow: 5,
        pauseByHover: true,
        infinity: true,
        timeout: 0
    };

    assets: any[] = [
        '/assets/preview/01.png',
        '/assets/preview/egg.png',
        '/assets/preview/02.png',
        '/assets/preview/egg.png',
        '/assets/preview/03.png',
        '/assets/preview/egg.png',
        '/assets/preview/04.png',
        '/assets/preview/egg.png',
        '/assets/preview/05.png',
        '/assets/preview/egg.png',
        '/assets/preview/06.png',
        '/assets/preview/egg.png',
        '/assets/preview/07.png',
        '/assets/preview/egg.png',
        '/assets/preview/08.png',
        '/assets/preview/egg.png',
    ];

    assets2: any[] = [
        '/assets/preview/egg.png',
        '/assets/preview/05.png',
        '/assets/preview/egg.png',
        '/assets/preview/06.png',
        '/assets/preview/egg.png',
        '/assets/preview/07.png',
        '/assets/preview/egg.png',
        '/assets/preview/08.png',
        '/assets/preview/egg.png',
        '/assets/preview/01.png',
        '/assets/preview/egg.png',
        '/assets/preview/02.png',
        '/assets/preview/egg.png',
        '/assets/preview/03.png',
        '/assets/preview/egg.png',
        '/assets/preview/04.png',
    ];

    currentWidth: number = 0;

    @HostListener('window:resize', ['$event'])
    onWindowResize(event: any): void {
        this.currentWidth = event.target.innerWidth;
        this.changeCarouselConfig();
    }

    changeCarouselConfig(): void {
        this.config.slidesToShow = Math.floor(this.currentWidth / 370);
    }

    constructor() {
    }

    ngOnInit(): void {
        this.currentWidth = window.innerWidth;
        this.changeCarouselConfig();
    }

}
