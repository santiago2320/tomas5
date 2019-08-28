import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevelopComponent } from './components/develop/develop.component';
import { EncuestaRojaComponent } from './components/encuesta-roja/encuesta-roja.component';
import { EncuestaAzulComponent } from './components/encuesta-azul/encuesta-azul.component';
import { EscogerComponent } from './components/escoger/escoger.component';
import { LoginComponent } from './components/login/login.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';


const routes: Routes = [
	{path:"", redirectTo:"/login", pathMatch: 'full'},
  {path:"develop",component:DevelopComponent },
  {path:"encuestaroja",component:EncuestaRojaComponent },
  {path:"encuestaazul",component:EncuestaAzulComponent },
  {path:"escoger",component:EscogerComponent },
  {path:"login",component:LoginComponent },
  {path:"bienvenido",component:BienvenidoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
