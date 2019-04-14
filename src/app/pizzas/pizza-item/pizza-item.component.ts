import { Component, OnInit, Input } from "@angular/core";
import { Pizza } from "../pizzas";
import { ModalService } from "./modal.service";

@Component({
  selector: "app-pizza-item",
  templateUrl: "./pizza-item.component.html",
  styleUrls: ["./pizza-item.component.scss"],
  providers: [ModalService]
})
export class PizzaItemComponent implements OnInit {
  @Input() pizza: Pizza;

  isOpen = false;
  priceClass = "price";

  selectedSize: number;
  sizes: Array<number> = [];
  ingredients: Array<string> = [];

  constructor(private modalService: ModalService) {}

  changed(size: any) {
    this.selectedSize = size;
  }
  open = () => {
    this.isOpen = this.modalService.open();
  };
  close = () => {
    this.isOpen = this.modalService.close();
  };
  ngOnInit() {
    this.pizza.info.map(item => {
      this.sizes.push(item.size);
    });
    this.pizza.ingredients.map(item => {
      this.ingredients.push(item.ingredient);
    });
  }
}
