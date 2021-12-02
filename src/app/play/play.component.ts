import { Component, OnInit } from '@angular/core';
import {Board} from "./Board";
import {Card} from "./Card";
import {UserRestService} from "../shared/user-rest.service";
import {record} from "../shared/model/record.model";
import {HttpParams} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {PreferencesMngService} from "../shared/preferences-mng.service";

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
  finish = false;
  isToken = false;

  constructor(private conex: UserRestService,  private toastr: ToastrService, private preferences: PreferencesMngService) {
  }

  ngOnInit(): void {
    let num: number;
    this.time = this.preferences.getTime();
    num = this.preferences.getCards();
    this.board = new Board(num, this.time);
    if(this.time != 0){
      this.clock();
    }
    this.board.build();
    if(sessionStorage.getItem('token') != '' && sessionStorage.getItem('user') != ''){
      this.isToken = true;
    }
  }

  save(){
    let token = sessionStorage.getItem('token');
    let body = {
      time: this.time,
      entry: this.entry,
      win: this.win,
      card1: this.card1,
      card2: this.card2,
      board: this.board
    };
    this.conex.postGame(body, token).subscribe(
      next =>{},
      error => {
        if(error.status == 400){
          this.toastr.error('Faltan datos');
        }else if( error.status == 401){
          this.toastr.error('Token incorrecto');
        }else if( error.status == 500){
          this.toastr.error('Error interno. Inténtalo más tarde');
        }
      }
    );
  }

  recover(){
    let token, json: any;
    token = sessionStorage.getItem('token');
    this.conex.getGame(token).subscribe(
      (value: any) => {
        json = JSON.parse(value);
        this.buildNewGame(json);
      },
      error => {
        if( error.status == 401){
          this.toastr.error('Token incorrecto');
        }else if( error.status == 500){
          this.toastr.error('Error interno. Inténtalo más tarde');
        }
      }
    );
  }

  buildNewGame(json: any){
    let newBoard: Board;
    this.time = json.time;
    if(this.time != 0){
      this.clock();
    }
    this.punt = json.board.punt;
    this.entry = json.entry;
    this.win = json.win;
    this.card1 = json.card1;
    this.card2 = json.card2;
    newBoard = new Board(json.board.num, json.board.time);
    newBoard.setPunt(json.board.punt);
    newBoard.setStates(json.board.states);
    newBoard.buildByJson(json.board.cards);
    this.board = newBoard;
  }

  saveRecord(){
    let token, body;
    token = sessionStorage.getItem('token');
    body = {
      punctuation: this.board.getPunt(),
      cards: this.board.getNum(),
      disposedTime: this.board.getTime()
    };
    this.conex.postRecord(body,token).subscribe(
      value => {},
      error => {
        if(error.status == 400){
          this.toastr.error('Faltan datos');
        }else if( error.status == 401){
          this.toastr.error('Token incorrecto');
        }else if( error.status == 500){
          this.toastr.error('Error interno. Inténtalo más tarde');
        }
      }
    );
  }

  action(card: Card){
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
        this.finish = true;
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
