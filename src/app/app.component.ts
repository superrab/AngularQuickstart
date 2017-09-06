import { Component } from '@angular/core';

/**
 * A router component since the html template has a router outlet
 */
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [],
})
export class AppComponent {
    public title : string = `Tour of Heroes`;
}