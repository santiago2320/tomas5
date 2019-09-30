import { Injectable } from '@angular/core';
import { ServicioOfflineService } from './servicio-offline.service';
import { Router, ActivatedRoute, Route } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EncuestaService } from 'src/app/services/encuesta.service';
import {GeneralServiceService}from 'src/app/services/general-service.service';
import Dexie from 'dexie';
declare var _ : any;

@Injectable({
  providedIn: 'root'
})
export class SincronizacionService {

  private usuariosDb: any;
  private entradasDb: any;
  private respuestasDb: any;
  counterSincronizacion: number;

  constructor(private servicioOfflineService:ServicioOfflineService, private encuestaService: EncuestaService, private generalService: GeneralServiceService) {
  	this.registerToEvents(servicioOfflineService);
    this.crearTablas();
  }

  private registerToEvents(servicioOfflineService: ServicioOfflineService) {
    
    servicioOfflineService.connectionChanged.subscribe(online => {
    
      console.log(online);
      if (online) {
        console.log('En linea!');    
        this.leerDexieYSincronizar();    
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
       usuarios: "++id,nombre,cedula,is_contratista,empresa_contratista,unidad_negocio"
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
       entradas: "++id,id_encuesta,fecha,id_usuario,id_localizacion,dexie"
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
       respuestas: "++id,id_pregunta,id_item,respuesta,id_entrada,dexie"
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
      
    }).catch(e=>{
      alert("Error de dexie");
    });
  }  

  async addRespuesta(respuesta){
    /*Respuesta--> {id_pregunta:1,id_item:2,respuesta:"si",id_entrada:1,dexie:true};*/
    this.respuestasDb.respuestas.add(respuesta).then(function(res){
      console.log("Respuestas creadas en Dexie:");
      console.log(res);
    }).catch(e=>{
      alert("Error de dexie");
    });
  }

  async addRespuestas(respuestas){    
    this.respuestasDb.respuestas.bulkAdd(respuestas).then(function(res){
      console.log("Respuestas creadas en Dexie:");
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
    }).catch(e=>{
      alert("Error de dexie");
    });
  }

  cambiarId(items){
    _.forEach(items,item=>{
      item.id_dexie = item.id;
      delete item.id;
    });
    console.log("ids cambiados");
    console.log(items)
  }

  cambiarIdObjeto(objeto){
    
    objeto.id_dexie = objeto.id;
    delete objeto.id;
    console.log("id cambiado");
    console.log(objeto)
  }



  sincronizar(usuarios,entradas,respuestas){
    var entradasBd = _.filter(entradas,function(ent){return !(ent.dexie);});
    var entradasDexie = _.filter(entradas,function(ent){return (ent.dexie);});
    var respuestasBd = _.filter(respuestas,function(ent){return !(ent.dexie);});
    var respuestasDexie = _.filter(respuestas,function(ent){return (ent.dexie);});
    this.modeloEntradas(entradasBd,respuestasDexie);
    this.modeloEntradas(entradasDexie,respuestasDexie);
    this.modeloUsuarios(usuarios,entradasDexie);
    this.guardarUsuarios(usuarios);
    this.guardarEntradas(entradasBd);
    this.guadarRespuestas(respuestasBd);
  }

  guadarRespuestas(respuestasBd){
    this.cambiarId(respuestasBd);
    this.encuestaService.postRespuesta(respuestasBd).subscribe(res=>{
      console.log("Sincronizado");
      console.log(res);
      _.forEach(respuestasBd,asw=>{
        this.deleteRespuesta(asw.id_dexie);
      });
    });
  }

  guardarUsuarios(usuarios){
    var idUsuarioActivo = window.localStorage.id_usuario==0?window.localStorage.id_usuario_dexie:0;
    var usuariosInactivos = _.filter(usuarios,function(ent){
      return ent.id != idUsuarioActivo;
    });
    var usuarioActivo = _.find(usuarios,function(ent){
      return ent.id == idUsuarioActivo;
    });
    if(usuarioActivo){
      this.guardarUsuarioActivo(usuarioActivo);//To-do
    }
    _.forEach(usuariosInactivos,user=>{
      this.guardarUsuarioInactivo(user);//To-do  
    });
  }

  guardarEntradas(entradas){
    var idEntradaActiva = window.localStorage.id_entrada==0?window.localStorage.id_entrada_dexie:0;
    var entradasInactivas = _.filter(entradas,function(ent){
      return ent.id != idEntradaActiva;
    });
    var entradaActiva = _.find(entradas,function(ent){
      return ent.id == idEntradaActiva;
    });
    if(entradaActiva){
      this.guardarEntradaActiva(entradaActiva);//To-do
    }
    _.forEach(entradasInactivas,ent=>{
      this.guardarEntradaInactiva(ent);//To-do
    });
  }

  modeloUsuarios(usuarios,entradasDexie){
    _.forEach(usuarios,function(user){
      user.entradas = _.filter(entradasDexie,function(ent){
        ent.id_usuario == user.id;
      });
    });
  }

  modeloEntradas(entradas,respuestasDexie){
    _.forEach(entradas,function(ent){
      ent.respuestas = _.filter(respuestasDexie,function(res){
        res.id_entrada == ent.id;
      });
    });
  }

  ponerIdEntrada(id_entrada,respuestas){
    _.forEach(respuestas,function(res){
      res.id_entrada =id_entrada;
    });
  }

  ponerIdUsuario(id_usuario,entradas){
    _.forEach(entradas,function(res){
      res.id_usuario =id_usuario;
    });
  }

  async leerDexieYSincronizar(){
    //To-do
    //Leer las 3 tablas de dexie y llamar:
    var usuarios = await this.usuariosDb.usuarios.toArray();
    var entradas = await this.entradasDb.entradas.toArray();
    var respuestas = await this.respuestasDb.respuestas.toArray();
    this.sincronizar(usuarios,entradas,respuestas);
  }

  guardarEntradaActiva(entrada){
    //To-do
    //guardar la entrada
    this.cambiarIdObjeto(entrada);
    this.generalService.postEntrada(entrada).subscribe(resa=>{
      //poner el id en el localStorage
      console.log("Sincronizado");
      console.log(resa);
      this.deleteEntrada(entrada.id_dexie);
      window.localStorage.setItem("id_entrada",resa.id);
      //pone el id de la entrada a las respuestas asociadas (entrada.respuestas)
      //ver this.ponerIdEntrada(id_entrada,respuestas)
      this.ponerIdEntrada(resa.id,entrada.respuestas);
      this.guadarRespuestas(entrada.respuestas);
    });
  }

  guardarEntradaInactiva(entrada){
    //To-do
    //guardar la entrada
    this.cambiarIdObjeto(entrada);
    this.generalService.postEntrada(entrada).subscribe(resa=>{
      console.log("Sincronizado");
      console.log(resa);
      this.deleteEntrada(entrada.id_dexie);
      //pone el id de la entrada a las respuestas asociadas (entrada.respuestas)
      //ver this.ponerIdEntrada(id_entrada,respuestas)
      this.ponerIdEntrada(resa.id,entrada.respuestas);
      this.guadarRespuestas(entrada.respuestas);
    });
  }

  guardarUsuarioActivo(user){
    //To-do
    //guardar el usuario
    this.cambiarIdObjeto(user);
    this.generalService.postUsuario(user).subscribe(reus=>{
      console.log("Sincronizado");
      console.log(reus);
      this.deleteUsuario(user.id_dexie);
      //poner el id en el localStorage
      window.localStorage.setItem("id_usuario",reus.id);
      //pone el id del usuario a las entradas asociadas
      this.ponerIdUsuario(reus.id,user.entradas);
      //llama guardarEntradas con las entradas del usuario
      this.guardarEntradas(user.entradas);
    });
    
  }

  guardarUsuarioInactivo(user){
    //To-do
    //guardar el usuario
    this.cambiarIdObjeto(user);
    this.generalService.postUsuario(user).subscribe(reus=>{
      console.log("Sincronizado");
      console.log(reus);
      this.deleteUsuario(user.id_dexie);
      //pone el id del usuario a las entradas asociadas
      this.ponerIdUsuario(reus.id,user.entradas);
      //llama guardarEntradas con las entradas del usuario
      this.guardarEntradas(user.entradas);
    });
  }


}
