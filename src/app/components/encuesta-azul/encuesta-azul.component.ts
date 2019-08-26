iimport { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encuesta-azul',
  templateUrl: './encuesta-azul.component.html',
  styleUrls: ['./encuesta-azul.component.css']
})
export class EncuestaAzulComponent implements OnInit {

	proceso: any[];

  pasoActual: any;


  constructor() { }

  ngOnInit() {
  	this.proceso = [
  		{tipo:"titulo",  infoPaso:{titulo:"Este es un titulo", id:1}},
  		{tipo:"cerrada", infoPaso:{pregunta:"Te gusta el helado?", si:"Que bueno", no:"que idiot eres", id:1}},
  		{tipo:"abierta", infoPaso:{pregunta:"Cual es tu sabor favorito?",  id:1}},
  		{tipo:"abierta_bombillo",infoPaso:{pregunta:"Cual es tu sabor favorito?", mensaje:"Piensalo bien", tipo:"arriba", id:1}},
      {tipo:"bombillo_abierta",infoPaso:{pregunta:"Cual es tu sabor favorito?", mensaje:"Piensalo bien", tipo:"arriba", id:1}},
  		{tipo:"riesgos", infoPaso:{pregunta:"Selecciona los riesgos que identificas:", riesgos:[
                    {pregunta:"riesgo 1", id:1},
                    {pregunta:"riesgo 2", id:1},
                    {pregunta:"riesgo 3", id:1}]}},
  		{tipo:"controles", infoPaso:{pregunta:"Cuales controles aplicas", controles:[
                    {pregunta:"controles 1", id:1},
                    {pregunta:"controles 2", id:1},
                    {pregunta:"controles 3", id:1}]}}  		
  	];
  }

}
