import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
 
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
 
// Observable class extensions
import 'rxjs/add/observable/of';
 
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import Hero from './hero';
import { HeroSearchService } from './hero-search.service';

@Component({
    selector: 'hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css'],
    providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {

    public heroes: Observable<Hero[]>;
    private searchTerms: Subject<string> = new Subject<string>();

    constructor(
        private heroSearchServ: HeroSearchService,
        private router: Router
    ) {}

    ngOnInit() {
        const emptyObs: Observable<Hero[]> = Observable.of<Hero[]>([]);

        this.heroes = this.searchTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering term
            .distinctUntilChanged() // ignore if next search term is same as prevoius
            .switchMap((term: string) => term ? this.heroSearchServ.search(term) : emptyObs)
            .catch((error: any) => {
                console.log(error);
                return emptyObs;
            });
    }

    /**
     * Push a search term into the observable stream
     */
    public search(term: string): void {
        this.searchTerms.next(term);
    }

    public gotoDetail(h: Hero): void {
        let link = ['/detail', h.id];
        this.router.navigate(link);
    }
}