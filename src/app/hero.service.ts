import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import Hero from './hero';
// import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

    private heroesUrl = 'api/heroes'; // URL to heroes web api
    private headers = new Headers({'Content-Type' : 'application/json' });

    constructor(private http: Http) {}

    private handleError(error: any): Promise<any> {
        console.error('An error ocurred', error);
        return Promise.reject(error.message || error);
    }

    // public getHeroesBlocking(): Hero[] {
    //     return HEROES;
    // }

    /**
     * Get a bunch of heroes as a Promise (non-blocking)
     */
    public getHeroes(): Promise<Hero[]> {
        // return Promise.resolve(HEROES);

        // return new Promise((resolve, reject) => {
        //     resolve(HEROES);

        //     // reject(new Error("SUP"));
        // });

        let getReq : Observable<any> =  this.http.get(this.heroesUrl)
        let prom : Promise<any> = getReq.toPromise()
        let ret : Promise<Hero[]> = prom.then(response => response.json().data as Hero[])
            .catch(this.handleError);

        return ret;
    }

    public getHeroesAsObservable(): Observable<Hero[]> {
        // return this.http.get(this.heroesUrl)
        //     .map(val => val.json().data as Hero[])

        // This version will stop handling one emission if another comes out during it
        return this.http.get(this.heroesUrl)
            .switchMap(resp => Observable.of<Hero[]>(resp.json().data as Hero[]));
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

        // // Readable version
        // return new Promise((resolve, reject): void => {
        //     if (!id) {
        //         reject("Please provide a valid ID");
        //         return;
        //     }
            
        //     let ret : Hero = null;

        //     this.getHeroesSlowly()
        //         .then(heroes => heroes.find(hero => hero.id === id))
        //         .then(hero => {
        //             ret = hero;

        //             if (!ret) {
        //                 reject(`Could not find Hero ID: ${id}`)
        //             } else {
        //                 resolve(ret);
        //             }
        //         });
        // }); // new Promise

        const url = `${this.heroesUrl}/${id}`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
    } // getHero()

    /**
     * Since this is using PUT the fake web API knows to only update the hero
     * with the provided ID from the URL and will not create duplicates
     * (it is idempotent)
     */
    public update(hero: Hero) : Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(resp => hero)
            .catch(this.handleError);
    } // update()

    /**
     * Since this is using POST multiple requests to create a hero with the
     * same name will create multiple heroes of the same name with different
     * IDs.
     */
    public create(name: string) : Promise<Hero> {
        const url: string = `${this.heroesUrl}`;

        return this.http
            .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(resp => resp.json().data as Hero)
            .catch(this.handleError);
    }

    public delete(id: number) : Promise<void> {
        const url: string = `${this.heroesUrl}/${id}`;

        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(resp => null)
            .catch(this.handleError);
    }
} // class

