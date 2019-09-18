import { Injectable } from '@angular/core';
import { ServicioOfflineService } from './servicio-offline.service';
import { Router, ActivatedRoute, Route } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class SincronizacionService {

  constructor(private servicioOfflineService:ServicioOfflineService) {
  	this.registerToEvents(servicioOfflineService);
  }

  private registerToEvents(servicioOfflineService: ServicioOfflineService) {
    
    servicioOfflineService.connectionChanged.subscribe(online => {
    
      console.log(online);
      if (online) {
        console.log('En linea!');        
       
        //pass the items to the backend if the connetion is enabled
        //this.sendItemsFromIndexedDb();
      } else {
        console.log('Desconectado!');        
       
      }
    });
    
  }
}
