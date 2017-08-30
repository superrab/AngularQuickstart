import { Component } from '@angular/core';
import Hero from './Hero';

@Component({
  selector: 'my-app',
  templateUrl: './AppComponent.html'
})
export class AppComponent  { 
  public title : string = `Tour of Heroes`; 
  public hero : Hero = new Hero(1, `Windstorm`);

}
