import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthMngService} from "./shared/managers/auth-mng.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'card-game-angular';
  notLog = true;

  constructor(private router: Router, private auth: AuthMngService) {
  }

  changeLog(){
    if(this.notLog){
      this.notLog = false;
    }else{
      this.notLog = true;
    }
  }

  finish(){
    this.auth.emptyAll();
    this.changeLog();
    this.router.navigateByUrl('/start');
  }
}
