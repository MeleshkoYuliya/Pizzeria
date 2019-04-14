import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-change-ingredient",
  templateUrl: "./change-ingredient.component.html",
  styleUrls: ["./change-ingredient.component.scss"]
})
export class ChangeIngredientComponent implements OnInit {
  @Input() ingredients: Array<any>;
  @Input() close: Function;
  constructor() {}
  ngOnInit() {}

  closeModal = () => {
    this.close();
  };
}
