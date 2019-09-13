import { Component, OnInit } from '@angular/core';
import {GeneralServiceService}from 'src/app/services/general-service.service';
/*import {EncuestaService}from 'src/app/services/encuesta.service';*/
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

import { DropdownModule } from 'primeng/dropdown';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectItem } from 'primeng/api';
import * as html2pdf from 'html2pdf.js';

declare var _ : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	localizaciones: any[];
	login: any;
	localizacion: any;

  onExportClick() {
    const options = {
      filename: "file.pdf",
      image: {type: "jpeg"},
      html2canvas: {},
      jsPDF: {orientation: "landscape"}      
    };
    const content: Element = document.getElementById("toexport");
    html2pdf()
    .from(content)
    .set(options)
    .save();
  }

  constructor(private generalService: GeneralServiceService,  private router: Router) { }

  ngOnInit() {
  	/*this.localizaciones = [
  		{nombre:"Planta 170"},
		{nombre:"Planta 240"},
		{nombre:"Planta Bombeo"},
		{nombre:"Planta Bosa"},
		{nombre:"Planta Fontibón"},
		{nombre:"Planta Puente Aranda"},
		{nombre:"Planta Siberia"},
		{nombre:"Planta Soacha"},
		{nombre:"Planta Sur Bogotá"},
		{nombre:"Planta Tocancipa"},
		{nombre:"Planta CXO"},
		{nombre:"Planta PTAR"},
		{nombre:"Planta Vistahermosa"},
		{nombre:"Mantenimiento"},
		{nombre:"Técnica y Desarrollo"},
		{nombre:"Bosa - Laboratorio"},
		{nombre:"Planta Novaterra"},
		{nombre:"Planta Bello"},
		{nombre:"Planta La Estrella"},
		{nombre:"Planta Rionegro"},
		{nombre:"Planta Puerto Berrio"},
		{nombre:"SOPETRAN"},
		{nombre:"Planta Mamonal"},
		{nombre:"Planta Santa Marta"},
		{nombre:"Planta Valledupar"},
		{nombre:"Planta Vía 40"},
		{nombre:"Planta Norte Cali"},
		{nombre:"Planta Pereira"},
		{nombre:"Planta Sur Cali"},
		{nombre:"Planta Tuluá"},
		{nombre:"Planta Anapoima"},
		{nombre:"Planta Ibagué la 60"},
		{nombre:"Planta Neiva"},
		{nombre:"Planta Sumapaz"},
		{nombre:"Planta Villavicencio"},
		{nombre:"Planta Aqualina"},
		{nombre:"Planta Garzón"},
		{nombre:"Planta Suaza"},
		{nombre:"Planta Aguachica"},
		{nombre:"Planta Cucuta"},
		{nombre:"Planta Floridablanca"},
		{nombre:"Comerciales"},
		{nombre:"Construrama"}
  	];*/
  	this.login = {nombre:"", cedula:""};

  	forkJoin(
      [
        this.generalService.getLocalizaciones()   //0
      ] 
    ).subscribe(response =>{
    	this.localizaciones = response[0];
    	this.localizaciones.splice(0, 0, {id: 0, nombre: 'Selecciona...'});
    	this.localizacion = this.localizaciones[0];
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
    	this.generalService.getUsuariosFilter(filter).subscribe(res=>{
    		console.log(res);
    		if(res.length>0){
    			/*si existe la cedula usamos ese usuario*/
    			var usuario = res[0];
				setUserAndSendToEscoger(usuario,this.router,this.localizacion);
			
    		}else{
    			/*de lo contrario creamos un nuevo usuario*/
    			this.generalService.postUsuario(this.login).subscribe(rea=>{
    				console.log(rea);
    				setUserAndSendToEscoger(rea,this.router,this.localizacion);
    			});
    		}
    	});
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
