import { Component, OnInit } from '@angular/core';
import {GeneralServiceService}from 'src/app/services/general-service.service';
/*import {EncuestaService}from 'src/app/services/encuesta.service';*/
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

import { DropdownModule } from 'primeng/dropdown';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectItem } from 'primeng/api';
import { SincronizacionService } from 'src/app/services/sincronizacion.service';

declare var _ : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	localizaciones: any[];
  unidades: any[];
	login: any;
  localizacion: any;
  loaded: boolean;
  

  constructor(private generalService: GeneralServiceService,private sincronizacionService: SincronizacionService, private router: Router) { }

  ngOnInit() {
    this.loaded = false;	
  	this.login = {nombre:"", cedula:"",empresa_contratista:"",is_contratista:"No", unidad_negocio:""};
    this.sincronizacionService.validarTokenYCargar(this,this.cargarDatos);
  }

  cargarDatos(_this){
    forkJoin(
      [
        _this.generalService.getLocalizaciones(),   //0
        _this.generalService.getUnidadesNegocio()
      ] 
    ).subscribe(response =>{
      console.log(response);
      _this.localizaciones = response[0];
      _this.localizaciones.splice(0, 0, {id: 0, nombre: 'Sitio de trabajo...'});
      _this.localizacion = _this.localizaciones[0];

      _this.unidades = response[1];
      _this.unidades.splice(0, 0, {id: 0, nombre: 'Unidad de negocio...'});
      _this.login.unidad_negocio = _this.unidades[0].nombre;
      _this.loaded = true;
    });
  }  

  logLocal() {
  	console.log(this.localizacion)
  }

  loginButton(){
  	/*validamos el formulario*/
  	var validacion = this.validar();
  	if(validacion == "OK"){
  		/*si el formulario esta bien*/
  		let filter = {
      where: {cedula:this.login.cedula}
    	};
    	/*Pedimos los usuarios con esa cedula*/
      let infoCertificado = {nombre:this.login.nombre,cedula:this.login.cedula,localizacion:this.localizacion.nombre};
      window.localStorage.setItem("infoUsuario",JSON.stringify(infoCertificado));
      var online = window.navigator.onLine;
      if(online){
        this.generalService.getUsuariosFilter(filter).subscribe(res=>{
          console.log(res);
          if(res.length>0){
            /*si existe la cedula usamos ese usuario*/
            var usuario = res[0];
            setUserAndSendToEscoger(usuario,this.router,this.localizacion);
        
          }else{            
            this.generalService.postUsuario(this.login).subscribe(rea=>{
                console.log(rea);
                setUserAndSendToEscoger(rea,this.router,this.localizacion);
            });          
          }
        });  
      }else{
        window.localStorage.setItem("id_usuario","0");
        this.sincronizacionService.addUsuario(this.login);              
        window.localStorage.setItem("id_localizacion",this.localizacion.id);
        this.router.navigate(['/escoger']);
      }	
  	}else {
  		/*le informamos al usuario que el formulario esta mal*/
  		alert(validacion);
  	}

  	function setUserAndSendToEscoger(user,router,localizacion){
		  window.localStorage.setItem("id_usuario",user.id);
		  window.localStorage.setItem("id_localizacion",localizacion.id);
  		router.navigate(['/escoger']);
  	}

  }

  validar(){
  	var res = "OK";
    if (this.login.is_contratista=="Si") {
      if (!this.login.empresa_contratista ||this.login.empresa_contratista==""){
        res="Escribe por favor el nombre de la empresa contratista";
      }
    }else{
      this.login.empresa_contratista = "N/A";
    }
    if(!this.login.unidad_negocio||this.login.unidad_negocio=='Unidad de negocio...'){
      res="Selecciona tu unidad de negocio";
    }
  	if(this.localizacion.id==0){
  		res = "Por favor selecciona un sitio de trabajo";
  	}
  	if(!this.login.cedula || this.login.cedula==""){
  		res = "Por favor escribe tu cedula";
	  } 
  	if(!this.login.nombre || this.login.nombre==""){
  		res = "Por favor escribe tu nombre";
    }    
    
  	return res;
  }
  
}
