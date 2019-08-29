import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

	mensajes: any[];
	mensajeActual: any;

  constructor(private router: Router) { }

  ngOnInit() {
  	this.mensajes = [
  		{texto:"En este momento te estás regalando unos minutos que te ayudarán a llegar sano a casa.", llamado:"¡ Adelante !"},
  		{texto:"Recuerda la razón por la que te levantas todos los días. Piensa en tu familia y comienza", llamado:"¡ Adelante !"},
  		{texto:"Estos 5 minutos contribuirán a que llegues sano a casa.", llamado:"¡Comienza ya!"}
  	];
  	var random = Math.random();
  	if(random<0.33){
  		this.mensajeActual = this.mensajes[0];
  	}else if(random<0.66){
  		this.mensajeActual = this.mensajes[1];
  	}else{
  		this.mensajeActual = this.mensajes[2];
  	}
  	
  	setTimeout(()=>{
  		this.router.navigate(['/encuestaazul']);
  	},3500);
  }

}
