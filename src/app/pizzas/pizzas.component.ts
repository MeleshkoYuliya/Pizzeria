import { Component, OnInit } from '@angular/core';
import * as SampleJson from '../../assets/pizzas.json';
import { Pizzas } from '../pizzas/pizzas';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent implements OnInit {
  pizzas: Pizzas;


  ngOnInit () {
    this.pizzas = SampleJson;
  }
}
