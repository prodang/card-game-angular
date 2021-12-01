import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent} from "./inicio/inicio.component";
import { PreferencesComponent} from "./preferences/preferences.component";
import { PlayComponent } from "./play/play.component";
import { RegisterComponent} from "./register/register.component";
import { LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path: 'start', component: InicioComponent},
  { path: 'preferences', component: PreferencesComponent},
  { path: 'play', component: PlayComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo:'start', pathMatch: 'full' },
  { path: '**', redirectTo:'/start', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
