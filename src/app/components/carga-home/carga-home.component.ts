import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GeneralServiceService}from 'src/app/services/general-service.service';
import { SincronizacionService } from 'src/app/services/sincronizacion.service';

@Component({
  selector: 'app-carga-home',
  templateUrl: './carga-home.component.html',
  styleUrls: ['./carga-home.component.css']
})
export class CargaHomeComponent implements OnInit {

  constructor(private generalService: GeneralServiceService,private sincronizacionService: SincronizacionService, private router: Router) { }

  ngOnInit() {
  	/*window.localStorage.setItem("token","WfyaNfIzGXSVwDBJzJIG2q0G0LTGyHZB3h0cIG6m33kSR8TU569ADqOqM3DtACI2");*/
  	this.generalService.login({"username":"admin", "password":"wakanda"}).subscribe(res=>{
  		console.log(res);
  		window.localStorage.setItem("token",res.id);
  		setTimeout(()=>{
	  		this.router.navigate(['/login']);
	  	},8500);
  	});
  	
  }

}
