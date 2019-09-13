import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { CargaHomeComponent } from './components/carga-home/carga-home.component';
import { BienvenidoRojoComponent } from './components/bienvenido-rojo/bienvenido-rojo.component';
import { EntornoTableComponent } from './components/entorno-table/entorno-table.component';
import { RiesgosEntornoComponent } from './components/riesgos-entorno/riesgos-entorno.component';
import { GeneralServiceService } from './services/general-service.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CertificadoComponent } from './components/certificado/certificado.component';


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
    BienvenidoComponent,
    CargaHomeComponent,
    BienvenidoRojoComponent,
    EntornoTableComponent,
    RiesgosEntornoComponent,
    CertificadoComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    DropdownModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [GeneralServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
