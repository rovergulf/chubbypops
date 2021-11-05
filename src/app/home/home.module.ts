import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { RarityComponent } from './rarity/rarity.component';
import { StoryComponent } from './story/story.component';
import { TeamComponent } from './team/team.component';
import { FaqComponent } from './faq/faq.component';
import { MinterComponent } from './minter/minter.component';
import { PreviewComponent } from './preview/preview.component';


@NgModule({
    declarations: [
        HomeComponent,
        RoadmapComponent,
        RarityComponent,
        StoryComponent,
        TeamComponent,
        FaqComponent,
        MinterComponent,
        PreviewComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class HomeModule {
}
