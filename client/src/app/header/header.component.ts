import { Component } from "@angular/core";
import {Router} from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["../app.component.scss"]
})
export class HeaderComponent {
constructor(private auth: AuthService,  private router: Router){}

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
