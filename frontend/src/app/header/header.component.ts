import { Component, OnInit } from "@angular/core";
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["../app.component.scss"]
})
export class HeaderComponent implements OnInit {
constructor(private auth: AuthService){}
isAuthenticated: boolean = this.auth.isAuthenticated();

ngOnInit(){
  console.log(this.isAuthenticated);
  
  // this.isAuthenticated = this.auth.isAuthenticated()
}
}
