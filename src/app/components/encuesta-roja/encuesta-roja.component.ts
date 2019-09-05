import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {EncuestaService}from 'src/app/services/encuesta.service';
import { forkJoin } from 'rxjs';
declare var _ : any;

@Component({
  selector: 'app-encuesta-roja',
  templateUrl: './encuesta-roja.component.html',
  styleUrls: ['./encuesta-roja.component.css']
})
export class EncuestaRojaComponent implements OnInit {

  proceso: any [];

  pasoActual: any;

  indexActual: number;

  textoHeader: any;

  mensaje: any;

  constructor(private encuestaService: EncuestaService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {

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
    this.modalService.open(content2,{size:'lg',centered:true})  
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
    if(mensaje=="OK" ){
      if(this.pasoActual.tipo == 'riesgos'){
        this.openModal2 (content2);
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

  guardarRespuestas(){
    var respuestas = this.crearRespuestasItems();
    var tiposRespuestaUnica = ["cerrada","abierta","abierta_bombillo","riesgosEntorno"];
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
      answer.respuesta = this.pasoActual.infoPaso.pregunta;
    } else if(this.pasoActual.tipo =="cerrada"){
      answer.respuesta = this.pasoActual.infoPaso.check;
    } else if(this.pasoActual.tipo =="abierta"){
      answer.respuesta = this.pasoActual.infoPaso.respuesta;
    } else if(this.pasoActual.tipo =="abierta_bombillo"){
      answer.respuesta = this.pasoActual.infoPaso.respuesta;
    } else if(this.pasoActual.tipo =="controles"){
      answer.respuesta = this.pasoActual.infoPaso.pregunta;
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

  actualizarPorcentaje() {
    var porcentaje = (this.indexActual+1)/this.proceso.length;
    var progressbar = document.querySelector(".barraprogreso") as HTMLElement;
    var widthBarra =  Math.round(porcentaje * 86);
    progressbar.style.width = widthBarra+"%";
    if(this.pasoActual.tipo == "titulo"){
      this.textoHeader = "Análisis de Riesgos";
    }else {
      this.textoHeader = "Mi entorno seguro";
    }
    var stepCont = document.querySelector("#stepContainer") as HTMLElement;
    stepCont.scrollTop = 0;

  }
  
  nextStep() {
    if(this.indexActual< this.proceso.length -1){
      var mensaje = this.validations();
      if(mensaje=="OK"){
        this.indexActual++;
       this.pasoActual = this.proceso[this.indexActual];
      }else{
        alert(mensaje);        
      }
    }else {
      this.router.navigate(['/escoger']);
    }
  }

  logPaso() {
    console.log(this.pasoActual);
  }

  validations(){
    var mensaje: string;
    var counter: number;
    mensaje = "OK";

    if (this.pasoActual.tipo == 'riesgosEntorno') {
      this.pasoActual.infoPaso.riesgosEntorno.forEach((riesgo)=>{
        if( riesgo.hasOwnProperty('check') ) {
          counter ++;
         }
         else{
           mensaje="Selecciona una respuesta para cada control";
          }
      });
    }
    return mensaje;
     }

  logPaso() {
    console.log(this.pasoActual);

  }

}
