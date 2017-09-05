import { Component, OnInit } from '@angular/core';

import Hero from './Hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  providers: [HeroService],
  styles: [`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .heroes li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .heroes li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .heroes li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .heroes .text {
    position: relative;
    top: -3px;
  }
  .heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
`]
})
export class AppComponent implements OnInit { 
  public title : string = `Tour of Heroes`; 
  //public hero : Hero = new Hero(1, `Windstorm`);
  public selectedHero : Hero = null;
  public heroes : Hero[] = null;

  constructor(private heroService: HeroService) { // defines a heroService property in the class
    // this.getHeroes(); // don't do data call here, use ngOnInit instead
  }

  ngOnInit(): void {
    this.getHeroes(); // right now this is synchronous / blocking, use a Promise for async
  }

  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }

  onSelect(h : Hero) : void {
    this.selectedHero = h;
  }

  deselectHero() : void {
    this.selectedHero = null;
  }
}
