import { Component, OnInit } from '@angular/core';
import { ModalContext } from '../modal/modal-context';
import { ModalContainerComponent } from '../modal/modal-container/modal-container.component';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {

  constructor(public context: ModalContext<any>) { }

  ngOnInit () {
  }

}
