import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encuesta-azul',
  templateUrl: './encuesta-azul.component.html',
  styleUrls: ['./encuesta-azul.component.css']
})
export class EncuestaAzulComponent implements OnInit {

	proceso: any[];

  pasoActual: any;

  indexActual: number;


  constructor() { }

  ngOnInit() {
  	this.proceso = [
      //{tipo:"titulo",  infoPaso:{titulo:"¿ hay algo adicional que debes tener en encuenta para garantizar tu integridad ?", id:1}},
  		//{tipo:"cerrada", infoPaso:{pregunta:"Pregunta uno?", si:"Que bueno", no:"que idiot eres", id:1}},
  		//{tipo:"abierta", infoPaso:{pregunta:"Cual es tu sabor favorito?",  id:1}},
  		//{tipo:"abierta_bombillo",infoPaso:{pregunta:"en que momento de la tarea estoy mas en riesgo?", mensaje:"asegurate de mantenerlas alejadas de la linea de fuego.imaginasi alog pasara", tipo:"arriba", id:1}},      
  		//{tipo:"riesgos", infoPaso:{pregunta:"Selecciona los riesgos que identificas:", riesgos:[
                    //{pregunta:"riesgo 1", id:1},
                    //{pregunta:"riesgo 2", id:1},
                    //{pregunta:"riesgo 3", id:1}]}},
  		//{tipo:"controles", infoPaso:{pregunta:"Cuales controles aplicas", controles:[
                    //{pregunta:"controles 1", id:1},
                    //{pregunta:"controles 2", id:1},
                    //{pregunta:"controles 3", id:1}]}},

      {tipo:"titulo",  infoPaso:{titulo:"Bienvenid@ a Toma 5: En este momento te estás regalando unos minutos que te ayudarán a llegar sano a casa. ¡ Adelante !", id:1}},
      {tipo:"titulo",  infoPaso:{titulo:"Bienvenid@ a Toma 5: Recuerda la razón por la que te levantas todos los días. Piensa en tu familia y comienza", id:1}},
      {tipo:"titulo",  infoPaso:{titulo:"Bienvenid@ a Toma 5: Estos 5 minutos contribuirán a que llegues sano a casa. ¡Comienza ya!", id:1}},
      {tipo:"titulo",  infoPaso:{titulo:"Invierte un momento para observar tu entorno, respira y da una vuelta al lugar en el cual trabajarás.  Esto marcará la direrencia", id:1}},
      {tipo:"riesgos", infoPaso:{pregunta:"Selecciona los riesgos que identificas:", riesgos:[
                    {pregunta:"1 Entrar en contacto / golpes con partes móviles de máquinas.", id:1},
                    {pregunta:"2 Entrar en contacto con aire comprimido.", id:1},
                    {pregunta:"3 Ser golpeado por proyección de objetos o partículas.", id:1},
                    {pregunta:"4 Ser golpeado por caída de objetos.", id:1},
                    {pregunta:"5 Ser golpeado por vehículos en movimiento o maquinaria móvil.", id:1},
                    {pregunta:"6 Golpearse contra objetos inmóviles.", id:1},
                    {pregunta:"7 Sufrir cortes o heridas punzantes.", id:1},
                    {pregunta:"8 Sobreesfuerzos.", id:1},
                    {pregunta:"9 Resbalones, tropiezos, caídas al mismo nivel y caídas a distinto nivel.", id:1},
                    {pregunta:"10 Ser atrapado entre, bajo objetos o maquinaria móvil.", id:1},
                    {pregunta:"11 Ahogamiento o asfixia.", id:1},
                    {pregunta:"12 Exposición o contactos con sustancias peligrosas (nocivos, irritantes, tóxicas).", id:1},
                    {pregunta:"13 Exposición a calor, superficies calientes, chispas o llamas.", id:1}]}},
      {tipo:"titulo",  infoPaso:{titulo:"Después de identificar los riesgos a los que estás expuesto: Pregúntate", id:1}},
      {tipo:"cerrada", infoPaso:{pregunta:"¿Tengo alguna situación personal que me esté afectando y pueda distraerme en mi trabajo?", si:"Tranquil@, a todos nos pasa. Piensa en cómo podrias sentirte más tranquil@ y de ser necesario habla con tu supervisor.", no:"Recuerda la emoción es un factor de riesgo y puede causarte un accidente", id:1}},
      {tipo:"abierta", infoPaso:{pregunta:"¿En qué momento de la tarea estoy más en riesgo?",  id:1}},
      {tipo:"abierta_bombillo",infoPaso:{pregunta:"¿En qué momento de la tarea mis manos estarán más expuestas?", mensaje:"Aseguráte de mantenerlas alejadas de la linea de fuego. Imagina si algo les pasara", id:1}},
      {tipo:"abierta_bombillo",infoPaso:{pregunta:"¿ Estoy seguro que las herramientas  son los adecuados y están en buen estado?", mensaje:"Verifica e inspecciona. Es mejor prevenir que lamentar. No pierdes nada con darles un vistazo.", id:1}},
      {tipo:"cerrada", infoPaso:{pregunta:"¿ Ya identificaste el lugar en el cual NUNCA debes ubicarte ?", si:"Retenla en tu mente para no entrar en la línea de fuego", no:"Tómate unos minutos para identificarlo", id:1}},
      {tipo:"cerrada", infoPaso:{pregunta:"¿ Sabes si alguien se ha lesionado realizando la labor?", si:"Recuerda a alguien le pasó. Toma las precauciones para que no te pase.", no:"Para evitar que a ti te pase. Sigue realizando análisis de riesgos", id:1}},
      {tipo:"abierta_bombillo",infoPaso:{pregunta:"¿ Qué es lo peor que te puede pasar ?", mensaje:"Piensa en el peor escenario y en el impacto para ti y tu familia.", id:1}},
      {tipo:"titulo",  infoPaso:{titulo:"Es hora de pensar en los controles para proteger tu integridad. ¿ Qué debes hacer para ejecutar la actividad de manera segura?", id:1}},
      {tipo:"controles", infoPaso:{pregunta:"Cuales controles aplicas", controles:[
                    {pregunta:"¿Cuento con el EEP adecuado y en buen estado?", id:1},
                    {pregunta:"¿ Ya revisé el SW de la tarea?", id:1},
                    {pregunta:"¿ Debo bloquear o etiquetar?", id:1},
                    {pregunta:"¿ Debo señalizar el area?", id:1},
                    {pregunta:"¿ Tengo el entrenamiento para realizar la tarea?", id:1},
                    {pregunta:"¿ Utilizo los senderos peatonales?", id:1},                    
                    {pregunta:"¿Debo informar a alguien de la tarea?", id:1}]}},
      {tipo:"abierta_bombillo",infoPaso:{pregunta:"¿ Conozco los pasos para realizar esta actividad de manera segura?", mensaje:"Recuerda: Los Atajos son una de las principales causas de accidente. Sigue el SW de la actividad.", id:1}},
      {tipo:"cerrada", infoPaso:{pregunta:"¿ Participe de la reunión de 5 minutos?", si:"Qué mensaje me quedó", no:"Habla con tu supervisor o pídele a un compañero que te cuente qué tema trataron.", id:1}},
      {tipo:"abierta_bombillo",infoPaso:{pregunta:"¿ Conoces los pasos para realizar esta actividad?", mensaje:"Recuerda: Los Atajos son una de las principales causas de accidente. Sigue el SW de la actividad.", id:1}},
      {tipo:"titulo",  infoPaso:{titulo:"Ya casi terminas…. Reflexiona", id:1}},
      {tipo:"titulo",  infoPaso:{titulo:"¿ Sabes qué hacer si algo sale mal?", id:1}},
      {tipo:"titulo",  infoPaso:{titulo:"¿ Hay algo adicional que debas tener en cuenta para garantizar tu integridad?", id:1}},
      {tipo:"titulo",  infoPaso:{titulo:"Antes de terminar…", id:1}},
      {tipo:"titulo",  infoPaso:{titulo:"Asegúrate que tu supervisor sepa que vas a realizar esta actividad", id:1}},
      {tipo:"titulo",  infoPaso:{titulo:"¿ Te comprometes a PARAR si observas una situación insegura o sientes que algo no esta bien?", id:1}},
      {tipo:"titulo",  infoPaso:{titulo:"¿Te comprometes a intervenir a un compañero si observas que está realizando un comportamiento inseguro?", id:1}}
  	];

    this.indexActual = 0;
    this.pasoActual = this.proceso[this.indexActual];
  }

  nextStep() {
    if(this.indexActual< this.proceso.length -1){
      this.indexActual++;
      this.pasoActual = this.proceso[this.indexActual];
    }
  }

}
