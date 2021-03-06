import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreferencesMngService {

  constructor() { }

  getCards(){
    let dateCards = localStorage.getItem('cards');
    if(dateCards){
      return parseInt(dateCards);
    }else{
      return 32;
    }
  }

  getTime(){
    let dateTime = localStorage.getItem('time');
    if(dateTime){
      return parseInt(dateTime);
    }else {
      return 0;
    }
  }

  setCards(cards: any){
    localStorage.setItem('cards', cards);
  }

  setTime(time: any){
    localStorage.setItem('time',time);
  }

  emptyAll(){
    localStorage.removeItem('cards');
    localStorage.removeItem('time');
  }
}
