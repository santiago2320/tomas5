import { Component, OnInit } from '@angular/core';
import {GeneralServiceService}from 'src/app/services/general-service.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import {SincronizacionService} from 'src/app/services/sincronizacion.service'; 


@Component({
  selector: 'app-escoger',
  templateUrl: './escoger.component.html',
  styleUrls: ['./escoger.component.css']
})
export class EscogerComponent implements OnInit {

	encuestas: any[];




  constructor(private generalService: GeneralServiceService,private sincronizacionService: SincronizacionService, private router: Router) { }


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
		  console.log ('offline')
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

  testCrear(){
    console.log("Creando...");
    var elNuevo = {id_pregunta:1,id_item:2,respuesta:"si",id_entrada:1,dexie:true};
    this.sincronizacionServicio.addUsuario(elNuevo);

  }

  testEditar(){
    console.log("Editando...");
    var elViejo = {id:1, id_pregunta:1,id_item:2,respuesta:"si pero talvez",id_entrada:1,dexie:true};
    this.sincronizacionServicio.putUsuario(elViejo);
    
  }

  testEliminar(){
    console.log("Eliminando...");
    var elViejo = {id:1, id_pregunta:1,id_item:2,respuesta:"si pero talvez",id_entrada:1,dexie:true};
    this.sincronizacionServicio.deleteUsuario(elViejo.id);
    
  }

}
