import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'card-game-angular';
  notLog = true;

  constructor(private router: Router) {
  }

  changeLog(){
    if(this.notLog){
      this.notLog = false;
    }else{
      this.notLog = true;
    }
  }

  finish(){
    sessionStorage.setItem('token','');
    sessionStorage.setItem('user','');
    this.changeLog();
    this.router.navigateByUrl('/start');
  }
}
