import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
 
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
import Hero           from './hero';

@Injectable()
export class HeroSearchService {

    constructor(private http: Http) {}

    public search(term: string): Observable<Hero[]> {
        const url: string = `api/heroes/?name=${term}`;

        // Turn Observable<Response> into Observable<Hero[]> with map()
        return this.http
            .get(url)
            .map(resp => resp.json().data as Hero[]);
    }
}