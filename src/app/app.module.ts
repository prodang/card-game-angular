import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule} from "ngx-toastr";

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { PlayComponent } from './play/play.component';
import { RegisterComponent } from './register/register.component';
import {UserRestService} from "./shared/user-rest.service";
import { LoginComponent } from './login/login.component';
import { RecordsComponent } from './records/records.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PreferencesComponent,
    PlayComponent,
    RegisterComponent,
    LoginComponent,
    RecordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      'timeOut': 5000,
      'closeButton': true,
      'tapToDismiss': true,
      'countDuplicates': true,
      'positionClass': 'toast-top-right'
    })
  ],
  providers: [UserRestService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
