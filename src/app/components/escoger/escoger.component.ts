import { Component, OnInit } from '@angular/core';
import {GeneralServiceService}from 'src/app/services/general-service.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escoger',
  templateUrl: './escoger.component.html',
  styleUrls: ['./escoger.component.css']
})
export class EscogerComponent implements OnInit {

	encuestas: any[];

  constructor(private generalService: GeneralServiceService, private router: Router) { }

  ngOnInit() {
  	let filter = {};
  	this.generalService.getEncuestasFilter(filter).subscribe(res=>{
  		console.log(res);
  		this.encuestas = res;
  	});
  }

  goColor(color:string){
  	var encuesta = this.encuestas.find(enc=>{
  		return enc.tipo == color;
  	});
  	if(encuesta){
  		var data = {
			  id_usuario:window.localStorage.id_usuario,
			  id_localizacion:window.localStorage.id_localizacion,
	  		fecha: new Date(),
	  		id_encuesta:encuesta.id
	  	};
	  	window.localStorage.setItem("id_encuesta",encuesta.id);
	  	/*console.log(data);*/
	  	this.generalService.postEntrada(data).subscribe(res=>{
	  		console.log(res);
	  		window.localStorage.setItem("id_entrada",res.id);
	  		this.router.navigate(['/encuesta'+color]);
	  	});
  	}else{
  		alert("Error! No se encuentra encuesta "+color+", contacta soporte!");
  	}
  }

  goBlue(){
  	this.goColor("azul");
  	
  }

  goRed(){
  	this.goColor("roja");
  }

}
