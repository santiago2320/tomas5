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
