import { Injectable, EventEmitter, Input, OnInit } from "@angular/core";

@Injectable()
export class ModalService {
  @Input() isOpen;

  open() {
    this.isOpen = true;
    return this.isOpen;
  }

  close() {
    this.isOpen = false;
    return this.isOpen;
  }
}
