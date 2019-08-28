import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DevelopComponent } from './components/develop/develop.component';
import { EncuestaRojaComponent } from './components/encuesta-roja/encuesta-roja.component';
import { EncuestaAzulComponent } from './components/encuesta-azul/encuesta-azul.component';
import { EscogerComponent } from './components/escoger/escoger.component';
import { LoginComponent } from './components/login/login.component';
import { ProgresoEnviarComponent } from './components/progreso-enviar/progreso-enviar.component';
import { PreguntaSiNoComponent } from './components/pregunta-si-no/pregunta-si-no.component';
import { AbiertaComponent } from './components/abierta/abierta.component';
import { AbiertaBombilloComponent } from './components/abierta-bombillo/abierta-bombillo.component';
import { BombilloAbiertaComponent } from './components/bombillo-abierta/bombillo-abierta.component';
import { GridControlesComponent } from './components/grid-controles/grid-controles.component';
import { GridRiesgosComponent } from './components/grid-riesgos/grid-riesgos.component';
import { TituloComponent } from './components/titulo/titulo.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';

@NgModule({
  declarations: [
    AppComponent,
    DevelopComponent,
    EncuestaRojaComponent,
    EncuestaAzulComponent,
    EscogerComponent,
    LoginComponent,
    ProgresoEnviarComponent,
    PreguntaSiNoComponent,
    AbiertaComponent,
    AbiertaBombilloComponent,
    BombilloAbiertaComponent,
    GridControlesComponent,
    GridRiesgosComponent,
    TituloComponent,
    BienvenidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
