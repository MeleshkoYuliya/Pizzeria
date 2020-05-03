import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order/order.service';
import { Observable } from 'rxjs';
import { Order } from '../order/interfaces';
import {MaterialService} from '../shared/classes/material.service';

@Component({
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.scss']
})
export class OrderDashboardComponent implements OnInit {
orders: Observable<Order[]>
  constructor(private service: OrderService) { }

  ngOnInit() {
   this.orders = this.service.getOrders();
  }

  cancelOrder(id: string){
    this.service.cancelOrder(id).subscribe(()=>MaterialService.toast('Your order was canceled'),
    (err)=> MaterialService.toast(err.error.message)
    );
    this.orders = this.service.getOrders();
  }
}
