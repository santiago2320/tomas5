import { Injectable } from '@angular/core';
import { ServicioOfflineService } from './servicio-offline.service';
import { Router, ActivatedRoute, Route } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Dexie from 'dexie';
declare var _ : any;

@Injectable({
  providedIn: 'root'
})
export class SincronizacionService {

  private usuariosDb: any;
  private entradasDb: any;
  private respuestasDb: any;

  constructor(private servicioOfflineService:ServicioOfflineService) {
  	this.registerToEvents(servicioOfflineService);
    this.crearTablas();
  }

  private registerToEvents(servicioOfflineService: ServicioOfflineService) {
    
    servicioOfflineService.connectionChanged.subscribe(online => {
    
      console.log(online);
      if (online) {
        console.log('En linea!');        
       
      } else {
        console.log('Desconectado!');        
       
      }
    });
    
  }
 
   private crearTablas(){
     //TABLA USUARIOS
     //Hacer new Dexie
     this.usuariosDb = new Dexie("TablaUsuarios");
     //Hacer crear la tabla (bases datos)
     this.usuariosDb.version(1).stores({
       usuarios: "++id,nombre,cedula,id_localizacion"
     });
     //Verificar que quedo bien
     this.usuariosDb.open().catch(function (err) {
       console.error (err.stack || err);
     });
 
     //TABLA ENTRADAS
     //Hacer new Dexie
     this.entradasDb = new Dexie("TablaEntradas");
     //Hacer crear la tabla (bases datos)
     this.entradasDb.version(1).stores({
       entradas: "++id,id_encuesta,fecha,id_usuario,dexie"
     });
     //Verificar que quedo bien
     this.entradasDb.open().catch(function (err) {
       console.error (err.stack || err);
     });
 
     //TABLA RESPUESTAS
     //Hacer new Dexie
     this.respuestasDb = new Dexie("TablaRespuestas");
     //Hacer crear la tabla (bases datos)
     this.respuestasDb.version(1).stores({
       usuarios: "++id,id_pregunta,id_item,respuesta,id_entrada,dexie"
     });
     //Verificar que quedo bien
     this.respuestasDb.open().catch(function (err) {
       console.error (err.stack || err);
     });
 
   }
 
 
   async addUsuario(usuario){
     /*usuario--> {id_pregunta:1,id_item:2,respuesta:"si",id_entrada:1,dexie:true};*/
     this.usuariosDb.usuarios.add(usuario).then(function(res){
       console.log("User creado en Dexie: "+res);
       window.localStorage.setItem("id_usuario_dexie",res);
     }).catch(e=>{
       alert("Error de dexie");
     });
   }

   async getUsuario(id_usuario){
      this.usuariosDb.usuarios.get(id_usuario).then(function(res){
        console.log(res);
      }).catch(e=>{
        alert("Error de dexie");
      });
    }
 
   async putUsuario(usuario){
     /*usuario--> {id:1,id_pregunta:1,id_item:2,respuesta:"si",id_entrada:1,dexie:true};*/
     this.usuariosDb.usuarios.put(usuario).then(function(res){
       console.log(res);
     }).catch(e=>{
       alert("Error de dexie");
     });
   }
 
   async deleteUsuario(id_usuario){
     /*usuario--> {id:1,id_pregunta:1,id_item:2,respuesta:"si",id_entrada:1,dexie:true};*/
     this.usuariosDb.usuarios.delete(id_usuario).then(function(res){
       console.log(res);
     }).catch(e=>{
       alert("Error de dexie");
     });
   }

   async addEntrada(entrada){
    /*entrada-> {id_pregunta:1,id_item:2,respuesta:"si",id_entrada:1,dexie:true};*/
    this.entradasDb.entradas.add(entrada).then(function(res){
      console.log("Entrada creada en Dexie: "+res);
      window.localStorage.setItem("id_entrada_dexie",res);
    }).catch(e=>{
      alert("Error de dexie");
    });
  }

  async getEntrada(id_entrada){
    this.entradasDb.entradas.get(id_entrada).then(function(res){
      console.log(res);
    }).catch(e=>{
      alert("Error de dexie");
    });
  }

  async putEntrada(entrada){
    /*entrada-> {id_pregunta:1,id_item:2,respuesta:"si",id_entrada:1,dexie:true};*/
    this.entradasDb.entradas.put(entrada).then(function(res){
      console.log(res);
    }).catch(e=>{
      alert("Error de dexie");
    });
  }

  async deleteEntrada(id_Entrada){
    /*entrada-> {id_pregunta:1,id_item:2,respuesta:"si",id_entrada:1,dexie:true};*/
    this.entradasDb.entradas.delete(id_Entrada).then(function(res){
      console.log(res);
    }).catch(e=>{
      alert("Error de dexie");
    });
  }  

  async addRespuesta(respuesta){
    /*Respuesta--> {id_pregunta:1,id_item:2,respuesta:"si",id_entrada:1,dexie:true};*/
    this.respuestasDb.respuestas.add(respuesta).then(function(res){
      console.log(res);
    }).catch(e=>{
      alert("Error de dexie");
    });
  }

  async addRespuestas(respuestas){    
    this.respuestasDb.version(1).stores({
        respuestasList: 'id_pregunta,id_entrada,id_item,respuesta'
    });
    this.respuestasDb.respuestasList.bulkAdd(respuestas).then(function(res){
      console.log(res);
    }).catch(Dexie.BulkError, function(e){
      alert("Error de dexie")
    });      
  }

  async putRespuesta(respuesta){
    /*Respuesta--> {id_pregunta:1,id_item:2,respuesta:"si",id_entrada:1,dexie:true};*/
    this.respuestasDb.respuestas.put(respuesta).then(function(res){
      console.log(res);
    }).catch(e=>{
      alert("Error de dexie");
    });
  }

  async deleteRespuesta(id_Respuesta){
    /*Respuesta--> {id_pregunta:1,id_item:2,respuesta:"si",id_entrada:1,dexie:true};*/
    this.respuestasDb.respuestas.delete(id_Respuesta).then(function(res){
      console.log(res);
    }).catch(e=>{
      alert("Error de dexie");
    });
  }





}
