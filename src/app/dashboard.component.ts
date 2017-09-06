import { Component, OnInit } from '@angular/core';

import Hero from './hero';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    public heroes: Hero[] = [];

    public constructor(private heroService: HeroService) {

    }

    public ngOnInit() {

        //Only keep heroes 2, 3, 4, 5
        this.heroService.getHeroesSlowly().then((heroes => this.heroes = heroes.slice(1, 5)))
    }
}