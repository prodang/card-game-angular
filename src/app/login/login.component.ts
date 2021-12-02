import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserRestService} from "../shared/user-rest.service";
import {HttpParams} from "@angular/common/http";
import {AppComponent} from "../app.component";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

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

  constructor(private conex: UserRestService, private app: AppComponent, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  send(){
    let user = this.form.get('user'),
      clave = this.form.get('clave'),
      body;

    if(user?.hasError('required')||clave?.hasError('required')){
      this.toastr.error('Faltan datos: usuario o clave');
    }else if(user?.hasError('maxlength')){
      this.toastr.error('El usuario debe tener menos de 9 caracteres');
    }else{
      body = new HttpParams()
        .append('username', user?.value)
        .append('password',clave?.value);
      this.checkUser(body, user?.value);
    }
  }

  private checkUser(body: HttpParams, user: string) {
    let token: any;
    this.conex.loginUser(body).subscribe(
      (next) => {
        token = next.headers.get('authorization');
        sessionStorage.setItem('token',token);
        sessionStorage.setItem('user', user)
        this.app.changeLog();
        this.toastr.success('Bienvenido '+user);
        this.router.navigateByUrl('/start');
      },
      error => {
        if(error.status == 400){
          this.toastr.error('Faltan datos: usuario o clave');
        }else if( error.status == 401){
          this.toastr.error('Datos incorrectos. Inténtalo de nuevo');
        }else if( error.status == 500){
          this.toastr.error('Error interno. Inténtalo más tarde');
        }
      }
    );
  }
}
