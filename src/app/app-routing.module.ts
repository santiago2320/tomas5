import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevelopComponent } from './components/develop/develop.component';
import { EncuestaRojaComponent } from './components/encuesta-roja/encuesta-roja.component';
import { EncuestaAzulComponent } from './components/encuesta-azul/encuesta-azul.component';
import { EscogerComponent } from './components/escoger/escoger.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:"develop",component:DevelopComponent },
  {path:"encuestaroja",component:EncuestaRojaComponent },
  {path:"encuestaazul",component:EncuestaAzulComponent },
  {path:"escoger",component:EscogerComponent },
  {path:"login",component:LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
