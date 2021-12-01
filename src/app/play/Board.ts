import {Card} from "./Card";

export class Board{
  cards: Array<Card>;
  num: number;
  time: number;
  punt: number;
  states: Array<string>;

  constructor(num: number, time: number){
    this.num = num;
    this.time = time;
    this.cards = new Array(num);
    this.punt = 0;
    this.states = new Array(num);
  }

  build(){
    for (let i=0;i<this.num;i++){
      this.cards[i] = new Card(i.toString(),'./assets/images/reverso.jpg');
    }
    this.buildStates();
  }

  buildStates(){
    let types = [1,2],
      ind = 0,
      cont = 1,
      relation = 0,
      i = 0;

    do{
      i = this.random(0,(this.num-1));
      if(this.states[i] == undefined){
        if(types[ind] == 1){
          this.states[i] = './assets/images/copas12.jpg';
        }else{
          this.states[i] = './assets/images/bastos1.jpg';
        }
        if(cont == 2){
          cont = 1;
          ind = (ind + 1) % 2;
        }else{
          cont++;
        }
        relation++;
      }
    }while(relation<this.num);
  }

  random(min: number, max: number) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

  getCards(){
    return this.cards;
  }

  showCard(id: string){
    let i = parseInt(id);
    this.cards[i].setState(this.states[i]);
  }

  isDiferent(card1: string, card2: string) {
    let i:number, j:number;
    i = parseInt(card1);
    j = parseInt(card2);
    return this.cards[i].getState() != this.cards[j].getState();
  }

  blockCard(card: string) {
    let i = parseInt(card);
    this.cards[i].change();
  }

  getPunt(){
    return this.punt;
  }

  add(){
    this.punt += 15;
  }

  subtract(){
    this.punt -= 5;
  }

  getNum(){
    return this.num;
  }

  calculateTotal(){
    if(this.num == 26){
      this.punt += 25;
    }else if(this.num == 32){
      this.punt += 50;
    }

    if(this.time == 60){
      this.punt += 100;
    }else if(this.time == 90){
      this.punt += 75;
    }else if(this.time == 120){
      this.punt += 50;
    }else if(this.time == 150){
      this.punt += 25;
    }
  }

  blockAll(){
    for(let i=0;i<this.num;i++){
      this.cards[i].setType(1);
    }
  }
}
