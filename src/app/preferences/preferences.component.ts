import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";
import {PreferencesMngService} from "../shared/preferences-mng.service";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})

export class PreferencesComponent implements OnInit {

  cards = [ 20, 26, 32 ];

  times = [ 0, 60, 90, 120, 150 ];

  form = new FormGroup({
    card: new FormControl(this.cards[2]),
    time: new FormControl(this.times[0])
  });

  constructor(private router: Router, private preferences: PreferencesMngService) {
  }

  ngOnInit(): void {
  }

  action(){
    let cards, time;
    cards = this.form.get('card')?.value;
    time = this.form.get('time')?.value;

    this.preferences.setCards(cards);
    this.preferences.setTime(time);

    this.router.navigateByUrl("/play");
  }
}
