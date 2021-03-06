import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Hero from './hero';

import { HeroService } from './hero.service';

/**
 * Shows a list of heroes for selection
 */
@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [], //HeroService was registered at AppComponent level already
})
export class HeroesComponent implements OnInit { 
  // public title : string = `Tour of Heroes`; 
  //public hero : Hero = new Hero(1, `Windstorm`);
  public selectedHero : Hero = null;
  public heroes : Hero[] = null;

  constructor(private heroService: HeroService, private router: Router) { // defines a heroService property in the class
    // this.getHeroes(); // don't do data call here, use ngOnInit instead
  }

  ngOnInit(): void {
    this.getHeroes(); // right now this is synchronous / blocking, use a Promise for async
  }

  getHeroes(): void {
    // this.heroes = this.heroService.getHeroes(); // non-Promise way
    this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes, reason => { /* rejected */ });
  }

  onSelect(h : Hero) : void {
    this.selectedHero = h;
  }

  deselectHero() : void {
    this.selectedHero = null;
  }

  public gotoDetail() : void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  public add(name : string) : void {
    name = name.trim();
    if (!name) { return; }

    this.heroService.create(name)
      .then(newHero => {
        // Put the new hero into our in memory hero list and clear out the selected one
        this.heroes.push(newHero);
        this.selectedHero = null;
      })
  }

  public delete(heroToDelete: Hero) : void {
    this.heroService.delete(heroToDelete.id)
      .then(hero => {

        // Remove the hero to be deleted from the heroes list
        this.heroes = this.heroes.filter(h => h !== heroToDelete);

        // Unselect the selected hero if it's the one to be deleted
        if (this.selectedHero === heroToDelete) { this.selectedHero = null; }
      });
  }
}
