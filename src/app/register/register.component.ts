import { Component, OnInit } from '@angular/core';
import {UserRestService} from "../shared/user-rest.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    email: new FormControl('', Validators.required),
    clave1: new FormControl('', Validators.required),
    clave2: new FormControl('', Validators.required)
  });

  constructor(private conex: UserRestService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  checkUser(){
    let user = this.form.get('user');
    if(user?.hasError('required') || user?.hasError('maxlength')){
      this.toastr.error('Condiciones de usuario inválidas. Introduce otro diferente.');
    }else{
      this.conex.getaUser(user?.value).subscribe(
        next => {
          this.toastr.error('Usuario ya existe. Introduce otro diferente.');
        },
        error => {
          if (error.status == 500){
            this.toastr.error('Error interno. Inténtalo más tarde');
          }else if(error.status == 404){}
        }
      );
    }
  }

  send(){
    let email = this.form.get('email'),
      clave1 = this.form.get('clave1'),
      clave2 = this.form.get('clave2'),
      user = this.form.get('user');

    if(email?.hasError('required')){
      this.toastr.error('Email es requerido');
    }else if(clave1?.hasError('required') || clave2?.hasError('required')){
      this.toastr.error('Las claves son requeridas');
    }else if(clave1?.value != clave2?.value){
      this.toastr.error('Las claves no son iguales');
    }else{
      this.buildUser(user, email, clave1);
    }
  }

  private buildUser(user: any, email: any, clave: any) {
    const newUser = {
      username: user?.value,
      email: email?.value,
      password: clave?.value
    };
    this.conex.postUser(newUser).subscribe(
      next => {
          this.toastr.success('Usuario registrado');
          this.router.navigateByUrl("/login");
        },
      error => {
        if(error.status == 400){
          this.toastr.error('Todos los datos deben estar rellenados.');
        }else if(error.status == 409){
          this.toastr.error('Usuario ya existe. Introduce otro diferente.');
        }else if(error.status == 500){
          this.toastr.error('Error interno. Inténtalo más tarde');
        }
      }
    );
  }
}
