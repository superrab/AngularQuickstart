import { Injectable } from '@angular/core';

import Hero from './Hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

    public getHeroesBlocking(): Hero[] {
        return HEROES;
    }

    /**
     * Get a bunch of heroes as a Promise (non-blocking)
     */
    public getHeroes(): Promise<Hero[]> {
        // return Promise.resolve(HEROES);

        return new Promise((resolve, reject) => {
            resolve(HEROES);

            // reject(new Error("SUP"));
        });
    }

    public getHeroesSlowly(): Promise<Hero[]> {
        return new Promise(resolve => {
            // Simulate 2 second delay
            setTimeout(() => resolve(this.getHeroes()), 2000);
        });
    }

    /**
     * Get a Hero matching given ID.
     */
    public getHero(id : number): Promise<Hero> {
        // return this.getHeroes()
        //             .then(heroes => heroes.find(hero => hero.id === id));

        // Readable version
        return new Promise((resolve, reject): void => {
            if (!id) {
                reject("Please provide a valid ID");
                return;
            }
            
            let ret : Hero = null;

            this.getHeroesSlowly()
                .then(heroes => heroes.find(hero => hero.id === id))
                .then(hero => {
                    ret = hero;

                    if (!ret) {
                        reject(`Could not find Hero ID: ${id}`)
                    } else {
                        resolve(ret);
                    }
                });
        }); // new Promise
    } // getHero()
} // class

