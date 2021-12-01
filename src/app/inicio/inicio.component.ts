import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  logo_upm = "../../assets/images/logo-upm.png";
  logo_miw = "../../assets/images/logo_miw.png";

  constructor() { }

  ngOnInit(): void {
  }

}
