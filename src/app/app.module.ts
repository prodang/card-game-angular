import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { PlayComponent } from './play/play.component';
import { RegisterComponent } from './register/register.component';
import {UserRestService} from "./shared/user-rest.service";
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PreferencesComponent,
    PlayComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserRestService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
