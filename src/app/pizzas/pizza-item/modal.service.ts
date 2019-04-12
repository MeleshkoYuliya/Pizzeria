export class ModalService {
  logToConsole (value: string) {
    console.log('status' + value);
  }

  open (isOpen) {
    console.log(isOpen);
    return isOpen;
  }
}
