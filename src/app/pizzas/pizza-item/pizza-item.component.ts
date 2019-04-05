import { Component, OnInit, Input, ViewChild, ViewContainerRef, } from '@angular/core';
import { Pizza } from '../pizzas';
import { ModalService } from '../modal/modal.service';
import { HelloComponent } from '../hello/hello.component';


@Component({
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.scss']
})
export class PizzaItemComponent implements OnInit {
  @Input() pizza: Pizza;
  priceClass = 'price';

  selectedSize: number;
  sizes: Array<number> = [];
  ingredients: Array<string> = [];

  constructor(private modalService: ModalService) {
  }

  async add () {
    console.log(await this.modalService.open(HelloComponent));
  }
  changed (size: any) {
    this.selectedSize = size;
  }

  ngOnInit () {
    this.pizza.info.map(item => {
      this.sizes.push(item.size);
    });
    this.pizza.ingredients.map(item => {
      this.ingredients.push(item.ingredient);
    });
  }
}
