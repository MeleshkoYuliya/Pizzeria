import { Component, OnInit, OnDestroy  } from "@angular/core";
import {Router} from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Store } from '@ngxs/store';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["../app.component.scss"]
})
export class HeaderComponent implements OnInit{
  pizzasAmount: number = 0;
constructor(private auth: AuthService,  private router: Router, private store: Store){}

ngOnInit() {
  this.store.select(state => state.pizzas.orderedPizzas).subscribe(pizzas => {this.pizzasAmount = pizzas.length })
}
    
checkAuth (){
  return this.auth.isAuthenticated();
}
  
checkIsAdmin() {
  return this.auth.isAurheticatedAdmin();
}

 logout(){
   this.auth.logout();
   this.router.navigate(['/login'])
 }
}
