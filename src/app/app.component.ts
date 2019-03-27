import { Component, OnInit, Input } from '@angular/core';
// import { Pizzas } from './pizzas/pizzas';
// import * as SampleJson from '../assets/pizzas.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // pizzas: Pizzas;
  title = 'Pizzeria';

  constructor() { }
  ngOnInit () {
    // this.pizzas = SampleJson;
  }
}
