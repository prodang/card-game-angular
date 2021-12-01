import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserRestService} from "../shared/user-rest.service";
import {HttpParams} from "@angular/common/http";
import {AppComponent} from "../app.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    clave: new FormControl('', Validators.required)
  });

  constructor(private conex: UserRestService, private app: AppComponent, private router: Router) { }

  ngOnInit(): void {
  }

  send(){
    let user = this.form.get('user'),
      clave = this.form.get('clave'),
      body;

    if(user?.hasError('required')||clave?.hasError('required')){
      alert('Faltan datos: usuario o clave');
    }else if(user?.hasError('maxlength')){
      alert('El usuario debe tener menos de 9 caracteres');
    }else{
      body = new HttpParams()
        .append('username', user?.value)
        .append('password',clave?.value);
      this.checkUser(body);
    }
  }

  private checkUser(body: HttpParams) {
    let token: any;
    this.conex.loginUser(body).subscribe(
      (next) => {
        token = next.headers.get('authorization');
        token = token.split(' ')[1];
        sessionStorage.setItem('token',token);
        this.app.changeLog();
        this.router.navigateByUrl('/start');
      },
      error => {
        if(error.status == 400){
          alert('Faltan datos: usuario o clave');
        }else if( error.status == 401){
          alert('Datos inválidos. Inténtalo de nuevo');
        }else if( error.status == 500){
          alert('Error interno. Inténtalo más tarde');
        }
      }
    );
  }
}
