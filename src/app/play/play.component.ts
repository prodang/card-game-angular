import { Component, OnInit } from '@angular/core';
import {Board} from "./Board";
import {Card} from "./Card";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  time = 0;
  punt = 0;
  total = 0;
  board = new Board(0,0);
  entry = 0;
  win = 0;
  card1 = "";
  card2 = "";

  constructor() {
  }

  ngOnInit(): void {
    let num: number;
    this.time = this.getTimeStorage();
    num = this.getNumStorage();
    this.board = new Board(num, this.time);
    if(this.time != 0){
      this.clock();
    }
    this.board.build();
  }

  save(){
    //TODO: Funcionalidad de guardar partida

  }

  recover(){
    //TODO: Funcinonalidad de recuperar partida
  }

  pruebaClick(card: Card){
    if(card.getType() == 0){
      this.entry++;
      this.relationCard(card.getId());
      if(this.card1 == this.card2){
        card.setState('./assets/images/reverso.jpg');
        this.entry = 0;
        this.initCards();
      }else{
        this.board.showCard(card.getId());
      }
      this.checkCards();
    }
  }

  checkCards(){
    if(this.entry == 2){
      if(this.board.isDiferent(this.card1,this.card2)){
        this.board.subtract();
        setTimeout(()=>{this.resetCard()}, 700);
      }else{
        this.win += 2;
        this.board.add();
        this.blockCards();
        this.initCards();
      }
      this.punt = this.board.getPunt();
      this.entry = 0;
      if(this.win == this.board.getNum()){
        this.board.calculateTotal();
        this.total = this.board.getPunt();
      }
    }
  }

  relationCard(id: string){
    if(this.card1 == ""){
      this.card1 = id;
    }else{
      this.card2 = id;
    }
  }

  blockCards(){
    this.board.blockCard(this.card1);
    this.board.blockCard(this.card2);
  }

  getTimeStorage(){
    let dateTime;
    dateTime = localStorage.getItem('time');
    if(dateTime!=null && dateTime != ''){
      return parseInt(dateTime);
    }else{
      return 0;
    }
  }

  getNumStorage(){
    let dateCards;
    dateCards = localStorage.getItem('cards');
    if((dateCards!=null)&&(dateCards!='')){
      return parseInt(dateCards);
    }else{
      return 32;
    }
  }

  clock(){
    if(this.time == 0){
      this.board.blockAll();
      if(this.win != this.board.getNum()){
        this.total = this.board.getPunt();
      }
    }else{
      if(this.win != this.board.getNum()){
        this.time--;
        setTimeout(()=>{this.clock()}, 1000);
      }
    }
  }

  initCards(){
    this.card1 = "";
    this.card2 = "";
  }

  resetCard(){
    let i:number, j:number;
    i = parseInt(this.card1);
    j = parseInt(this.card2);
    this.board.getCards()[i].setState('./assets/images/reverso.jpg');
    this.board.getCards()[j].setState('./assets/images/reverso.jpg');
    this.initCards();
  }

}
