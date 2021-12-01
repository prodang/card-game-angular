export class Card{
  id: string;
  state: string;
  type: number;
  constructor(id: string, state:string){
    this.id = id;
    this.state = state;
    this.type = 0;
  }

  setId(id: string){
    this.id = id;
  }

  setState(state: string){
    this.state = state;
  }

  setType(type: number){
    this.type = type;
  }

  getId(){
    return this.id;
  }

  getType(){
    return this.type;
  }

  getState(){
    return this.state;
  }

  change(){
    this.type = (this.type+1)%2;
  }
}
