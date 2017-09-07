import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import Hero from './hero';
import { HeroService } from './hero.service';

@Component({
    selector: 'hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    // @Input() // we aren't binding the selector anymore
    public hero : Hero = null;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private heroService: HeroService,
        private location: Location
    ) {

    }

    public goBack(): void {
        this.location.back();
    }

    public ngOnInit(): void {
        this.activatedRoute.paramMap
            .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
            .subscribe(hero => this.hero = hero)

        // console.log("Subscribed :id")
    }

    public save(): void {
        this.heroService.update(this.hero)
            .then(() => this.goBack());
    }
}