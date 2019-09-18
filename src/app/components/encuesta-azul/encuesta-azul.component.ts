import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { forkJoin } from 'rxjs';
import { SincronizacionService } from 'src/app/services/sincronizacion.service';


declare var _ : any;

@Component({
  selector: 'app-encuesta-azul',
  templateUrl: './encuesta-azul.component.html',
  styleUrls: ['./encuesta-azul.component.css']
})
export class EncuestaAzulComponent implements OnInit {

	proceso: any[];

  pasoActual: any;

  indexActual: number;

  mensaje: any;


  constructor(private encuestaService: EncuestaService,private sincronizacionService: SincronizacionService,private router: Router, private modalService: NgbModal) { }

  ngOnInit() {     
  	/*this.proceso = [
      {tipo:"titulo",  infoPaso:{titulo:"Invierte un momento para observar tu entorno, respira y da una vuelta al lugar en el cual trabajarás.  Esto marcará la direrencia.", id:1}},
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
      {tipo:"cerrada", infoPaso:{pregunta:"¿Tengo alguna situación personal que me esté afectando y pueda distraerme en mi trabajo?", si:"Tranquil@, a todos nos pasa. Piensa en cómo podrias sentirte más tranquil@ y de ser necesario habla con tu supervisor.", no:"Recuerda la emoción es un factor de riesgo y puede causarte un accidente", id:11}},
      {tipo:"abierta", infoPaso:{pregunta:"¿En qué momento de la tarea estoy más en riesgo?",  id:1}},
      {tipo:"abierta_bombillo",infoPaso:{pregunta:"¿En qué momento de la tarea mis manos estarán más expuestas?", mensaje:"Aseguráte de mantenerlas alejadas de la linea de fuego. Imagina si algo les pasara.", id:1}},
      {tipo:"abierta_bombillo",infoPaso:{pregunta:"¿ Estoy seguro que las herramientas  son los adecuados y están en buen estado?", mensaje:"Verifica e inspecciona. Es mejor prevenir que lamentar. No pierdes nada con darles un vistazo.", id:1}},
      {tipo:"cerrada", infoPaso:{pregunta:"¿ Ya identificaste el lugar en el cual NUNCA debes ubicarte ?", si:"Retenla en tu mente para no entrar en la línea de fuego", no:"Tómate unos minutos para identificarlo.", id:1}},
      {tipo:"cerrada", infoPaso:{pregunta:"¿ Sabes si alguien se ha lesionado realizando la labor?", si:"Recuerda a alguien le pasó. Toma las precauciones para que no te pase.", no:"Para evitar que a ti te pase. Sigue realizando análisis de riesgos.", id:1}},
      {tipo:"abierta_bombillo",infoPaso:{pregunta:"¿ Qué es lo peor que te puede pasar ?", mensaje:"Piensa en el peor escenario y en el impacto para ti y tu familia.", id:1}},
      {tipo:"titulo",  infoPaso:{titulo:"Es hora de pensar en los controles para proteger tu integridad. ¿ Qué debes hacer para ejecutar la actividad de manera segura?", id:1}},
      {tipo:"controles", infoPaso:{pregunta:"Cuales controles aplicas", controles:[
                    {pregunta:"¿Cuento con el EEP adecuado y en buen estado?", id:1},
                    {pregunta:"¿ Ya revisé el SW de la tarea?", id:2},
                    {pregunta:"¿ Debo bloquear o etiquetar?", id:3},
                    {pregunta:"¿ Debo señalizar el area?", id:4},
                    {pregunta:"¿ Tengo el entrenamiento para realizar la tarea?", id:5},
                    {pregunta:"¿ Utilizo los senderos peatonales?", id:6},                    
                    {pregunta:"¿Debo informar a alguien de la tarea?", id:7}]}},
      {tipo:"abierta_bombillo",infoPaso:{pregunta:"¿ Conozco los pasos para realizar esta actividad de manera segura?", mensaje:"Recuerda: Los Atajos son una de las principales causas de accidente. Sigue el SW de la actividad.", id:1}},
      {tipo:"cerrada", infoPaso:{pregunta:"¿ Participe de la reunión de 5 minutos?", si:"Qué mensaje me quedó", no:"Habla con tu supervisor o pídele a un compañero que te cuente qué tema trataron.", id:1}},
      {tipo:"abierta_bombillo",infoPaso:{pregunta:"¿ Conoces los pasos para realizar esta actividad?", mensaje:"Recuerda: Los Atajos son una de las principales causas de accidente. Sigue el SW de la actividad.", id:1}},
      {tipo:"titulo",  infoPaso:{titulo:"Ya casi terminas…. Reflexiona.", id:1}},
      {tipo:"titulo",  infoPaso:{titulo:"¿ Sabes qué hacer si algo sale mal?", id:1}},
      {tipo:"titulo",  infoPaso:{titulo:"¿ Hay algo adicional que debas tener en cuenta para garantizar tu integridad?", id:1}},
      {tipo:"titulo",  infoPaso:{titulo:"Antes de terminar…", id:1}},
      {tipo:"titulo",  infoPaso:{titulo:"Asegúrate que tu supervisor sepa que vas a realizar esta actividad.", id:1}},
      {tipo:"titulo",  infoPaso:{titulo:"¿ Te comprometes a PARAR si observas una situación insegura o sientes que algo no esta bien?", id:1}},
      {tipo:"titulo",  infoPaso:{titulo:"¿Te comprometes a intervenir a un compañero si observas que está realizando un comportamiento inseguro?", id:1}}

  	];*/
    this.pasoActual = {id:0, tipo:"cargando", infoPaso:{}};
    var id_encuesta = window.localStorage.id_encuesta;
    this.encuestaService.getEncuestaById(id_encuesta).subscribe(res=>{
      console.log(res);
      var pasos = res.preguntas;
      pasos = _.orderBy(pasos,"orden");
      this.proceso = [];            
      _.forEach(pasos,step=>{
        this.proceso.push(this.crearPaso(step));
      });
      var certi = {tipo:"certificado", infoPaso:{Pregunta:"",id:123}};
      this.proceso.push(certi);
      this.indexActual = 0;
      this.pasoActual = this.proceso[this.indexActual];
      this.actualizarPorcentaje();
    });

    
  }  

  crearPaso(paso){
    var step = {id:paso.id, tipo:paso.tipo, paso:paso, infoPaso:{}};
    if(paso.tipo =="titulo"){
      step.infoPaso = {
        id: paso.id,
        titulo: paso.pregunta
      };
    } else if(paso.tipo =="riesgos"){
      step.infoPaso = {
        id: paso.id,
        pregunta: paso.pregunta,
        riesgos: paso.items
      };
    } else if(paso.tipo =="cerrada"){
      step.infoPaso = {
        id: paso.id,
        pregunta: paso.pregunta,
        si: paso.mensaje_si,
        no: paso.mensaje_no
      };
    } else if(paso.tipo =="abierta"){
      step.infoPaso = {
        id: paso.id,
        pregunta: paso.pregunta
      };
    } else if(paso.tipo =="abierta_bombillo"){
      step.infoPaso = {
        id: paso.id,
        pregunta: paso.pregunta,
        mensaje: paso.mensaje
      };
    } else if(paso.tipo =="controles"){
      step.infoPaso = {
        id: paso.id,
        pregunta: paso.pregunta,
        controles: paso.items
      };
    } else if(paso.tipo =="entorno"){
      step.infoPaso = {
        id: paso.id,
        pregunta: paso.pregunta,
        riesgos: paso.items
      };
    } else if(paso.tipo =="riesgosEntorno"){
      step.infoPaso = {
        id: paso.id,
        pregunta: paso.pregunta,
        riesgosEntorno: paso.items
      };
    }else if(paso.tipo =="certificado"){
      step.infoPaso = {
        id: paso.id,
        pregunta: paso.pregunta
      };
    } else {
      console.log("Error: paso desconocido");
      console.log(paso);
    }
    return step;
  }

  openModal(content) {    
    this.modalService.open(content, { size: 'lg',centered: true });    
    /*console.log(this.modalService);*/
    setTimeout(()=>{this.modalService.dismissAll('Cross click');}, 2000); 
  }

  openModal2 (content2){
    this.modalService.open(content2,{size:'lg',centered:true});
  }

  cerrarModal () {
    this.avanzar(),this.modalService.dismissAll('Cerrar');
   }

  avanzar(){
    this.guardarRespuestas();
      if(this.indexActual< this.proceso.length -1){
        this.indexActual++;
        this.pasoActual = this.proceso[this.indexActual];
        this.actualizarPorcentaje();
      }else{
        this.router.navigate(['/escoger']);
      }
  }

  nextStep(content,content2) {
    var mensaje = this.validations();
    if(mensaje=="OK" || this.pasoActual.tipo == 'riesgos'){
      if(this.pasoActual.tipo == 'riesgos'){
        this.openModal2(content2);
      }else{
        this.avanzar();
      }
    }else{
      if(this.pasoActual.tipo != 'riesgos'){
        this.mensaje = mensaje;
        this.openModal(content);
      }
    }
  }

  logPaso() {
    console.log(this.pasoActual);
  }

  guardarRespuestas(){
    var respuestas = this.crearRespuestasItems();
    var tiposRespuestaUnica = ["cerrada","abierta","abierta_bombillo","riesgosEntorno","riesgos","controles"];
    if(tiposRespuestaUnica.indexOf(this.pasoActual.tipo)!=-1){
      respuestas.push(this.crearRespuesta());
    }
    this.encuestaService.postRespuesta(respuestas).subscribe(res=>{
      console.log(res);
    });
  }

  crearRespuesta(){
    var answer = {
      id_pregunta: this.pasoActual.id,
      id_entrada: window.localStorage.id_entrada,
      id_item: 0,
      respuesta:""
    };
    if(this.pasoActual.tipo =="titulo"){
      answer.respuesta = this.pasoActual.infoPaso.titulo;
    } else if(this.pasoActual.tipo =="riesgos"){
      answer.respuesta = this.pasoActual.infoPaso.respuesta || "...";
    } else if(this.pasoActual.tipo =="cerrada"){
      answer.respuesta = this.pasoActual.infoPaso.check;
    } else if(this.pasoActual.tipo =="abierta"){
      answer.respuesta = this.pasoActual.infoPaso.respuesta;
    } else if(this.pasoActual.tipo =="abierta_bombillo"){
      answer.respuesta = this.pasoActual.infoPaso.respuesta;
    } else if(this.pasoActual.tipo =="controles"){
      answer.respuesta = this.pasoActual.infoPaso.respuesta || "...";
    } else if(this.pasoActual.tipo =="entorno"){
      answer.respuesta = this.pasoActual.infoPaso.pregunta;
    } else if(this.pasoActual.tipo =="riesgosEntorno"){
      answer.respuesta = this.pasoActual.infoPaso.respuesta || "...";
    } else {
      console.log("Error: paso desconocido");
      console.log(this.pasoActual);
    }
    return answer;

  }

  crearRespuestasItems(){
    var answers = [];
    if(this.pasoActual.tipo =="titulo"){
    } else if(this.pasoActual.tipo =="riesgos"){
      _.forEach(this.pasoActual.infoPaso.riesgos,item=>{
        var answer = {
          id_pregunta: this.pasoActual.id,
          id_entrada: window.localStorage.id_entrada,
          id_item: item.id,
          respuesta:""
        };
        answer.respuesta = item.check? "Si":"No";
        answers.push(answer);
      });
    } else if(this.pasoActual.tipo =="controles"){
      _.forEach(this.pasoActual.infoPaso.controles,item=>{
        var answer = {
          id_pregunta: this.pasoActual.id,
          id_entrada: window.localStorage.id_entrada,
          id_item: item.id,
          respuesta:""
        };
        answer.respuesta = item.check;
        answers.push(answer);
      });
    } else if(this.pasoActual.tipo =="entorno"){
      _.forEach(this.pasoActual.infoPaso.riesgos,item=>{
        var answer = {
          id_pregunta: this.pasoActual.id,
          id_entrada: window.localStorage.id_entrada,
          id_item: item.id,
          respuesta:""
        };
        answer.respuesta = item.respuesta || "...";
        answers.push(answer);
      });
    } else if(this.pasoActual.tipo =="riesgosEntorno"){
      _.forEach(this.pasoActual.infoPaso.riesgosEntorno,item=>{
        var answer = {
          id_pregunta: this.pasoActual.id,
          id_entrada: window.localStorage.id_entrada,
          id_item: item.id,
          respuesta:""
        };
        answer.respuesta = item.check;
        answers.push(answer);
      });
    } 
    return answers;
  }

  actualizarPorcentaje () {
    var porcentaje = (this.indexActual+1)/this.proceso.length;
    var progressbar = document.querySelector(".barraprogreso") as HTMLElement;
    var widthBarra =  Math.round(porcentaje * 86);
    progressbar.style.width = widthBarra+"%";
    var stepCont = document.querySelector("#stepContainer") as HTMLElement;
    stepCont.scrollTop = 0;

  }

  validations(){
    var mensaje: string;
    var count:number;
    count=0;
    if (this.pasoActual.tipo == 'titulo') {
      
        mensaje="OK";
      
    }
    else if (this.pasoActual.tipo == 'riesgos') {
      var total: number;
      total=0;
      this.pasoActual.infoPaso.riesgos.forEach((riesgo)=>{
        if( riesgo.check==true ) {
          total = total +1;
         }         
      });
      this.mensaje = "Seleccionaste "+total+" de 13 riesgos, ¿Quieres continuar asi?";
      
    }
    else if (this.pasoActual.tipo == 'cerrada') {
      if( this.pasoActual.infoPaso.hasOwnProperty('check') ) {
        mensaje="OK";
       }
       else{
         mensaje="Por favor seleccione una respuesta";
        }
    }
    else if (this.pasoActual.tipo == 'abierta' || this.pasoActual.tipo == 'abierta_bombillo') {
      if( this.pasoActual.infoPaso.hasOwnProperty('respuesta') ) {
        if( this.pasoActual.infoPaso.respuesta != "") {
          mensaje="OK";
        }
        else{
          mensaje="Por favor escribe una respuesta";
        }
      }
      else{
        mensaje="Por favor escribe una respuesta";
      }
    }
    else if (this.pasoActual.tipo == 'controles') {
      this.pasoActual.infoPaso.controles.forEach((control)=>{
        if( control.hasOwnProperty('check') ) {
          count=count + 1;
          if (count == 7) {
             mensaje="OK";
          }          
         }
         else{
           mensaje="Selecciona una respuesta para cada control";
          }
      });
    } 
    return mensaje;
  }  
    
}
