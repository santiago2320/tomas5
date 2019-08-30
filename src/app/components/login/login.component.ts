import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	localizaciones: any[];

  constructor() { }

  ngOnInit() {
  	this.localizaciones = [
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
  	];
  }

}
