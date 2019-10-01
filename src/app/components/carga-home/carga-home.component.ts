import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
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
    
  	var online = window.navigator.onLine;
    if(online){
      this.loginOnline();
    }else{
      setTimeout(()=>{
        this.router.navigate(['/login']);
      },8500);
    }
  	
  }

  loginOnline(){
    const myPromise = val =>{
      return new Promise(resolve =>
        setTimeout(() => {resolve(`Promise Resolved: ${val}`)}, 8500)
      );
    }
      
    forkJoin(
      [
        this.generalService.login({"username":"admin", "password":"wakanda"}),   //0
        myPromise("Listo!")
      ] 
    ).subscribe(response =>{
      console.log(response);
      window.localStorage.setItem("token",response[0].id);
      this.router.navigate(['/login']);
    });
  }

}
