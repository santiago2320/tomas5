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
    this.routing();
  	this.sincronizacionService.validarTokenYCargar(this,this.cargarDatos);
  }  

  routing(){
    if(!this.sincronizacionService.entradaConocida()){
      this.router.navigate(['/escoger']);
    }
  }

  cargarDatos(_this){
    _this.pasoActual = {id:0, tipo:"cargando", infoPaso:{}};
    var id_encuesta = window.localStorage.id_encuesta;
    _this.encuestaService.getEncuestaById(id_encuesta).subscribe(res=>{
      console.log(res);
      var pasos = res.preguntas;
      pasos = _.orderBy(pasos,"orden");
      _this.proceso = [];            
      _.forEach(pasos,step=>{
        _this.proceso.push(_this.crearPaso(step));
      });
      var certi = {tipo:"certificado", infoPaso:{Pregunta:"",id:123}};
      _this.proceso.push(certi);
      _this.indexActual = 0;
      _this.pasoActual = _this.proceso[_this.indexActual];
      _this.actualizarPorcentaje();
    });
  }

  ajustarDexie(respuesta) {
    if (window.localStorage.id_entrada != "0") {
      respuesta.id_entrada = window.localStorage.id_entrada;
      respuesta.dexie = false;
    }else{
      respuesta.id_entrada = window.localStorage.id_entrada_dexie;
      respuesta.dexie = true;
    }
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
        window.localStorage.removeItem("id_entrada");
        window.localStorage.removeItem("id_entrada_dexie");
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
    //Crear repuestas de preguntas con subitems
    var respuestas = this.crearRespuestasItems();
    //Validar si tiene respuesta unica
    var tiposRespuestaUnica = ["cerrada","abierta","abierta_bombillo","riesgosEntorno","riesgos","controles"];
    if(tiposRespuestaUnica.indexOf(this.pasoActual.tipo)!=-1){
      //Crear la repuesta unica
      respuestas.push(this.crearRespuesta());
    }
    var online = window.navigator.onLine;
    if (online) {
      if (window.localStorage.id_entrada == 0) {
        this.sincronizacionService.addRespuestas(respuestas);
      }else{
        //Crear la respuestas en BD real
        this.encuestaService.postRespuesta(respuestas).subscribe(res=>{
          console.log(res);
        });
      }      
    }else{
      this.sincronizacionService.addRespuestas(respuestas);
    }
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
    this.ajustarDexie(answer);
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
        this.ajustarDexie(answer);
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
        this.ajustarDexie(answer);
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
        this.ajustarDexie(answer);
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
        this.ajustarDexie(answer);
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
    if (this.pasoActual.tipo == 'titulo' ||this.pasoActual.tipo == 'certificado') {
      
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
      this.mensaje = "Seleccionaste "+total+" de 13 riesgos, ¿Quieres continuar así?";
      
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
