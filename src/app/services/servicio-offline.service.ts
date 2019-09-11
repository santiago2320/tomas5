import { Injectable } from '@angular/core';
import { OfflineService } from './offline.service';
import Dexie from 'dexie';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioOfflineService {

  constructor(private readonly offlineService: OfflineService, private httpClient: HttpClient) {

    this.createIndexedDatabase();
    this.createDatabase();
    this.registerDate(offlineService);
   }

   private db: any;
  private donedb: any;

  // ---------- create the indexedDB
  private createIndexedDatabase(){

    this.db = new Dexie("DataBasetomas");
    this.db.version(1).stores({
      todos: "title,content,done"
    });
    this.db.open().catch(function (err) {
      console.error (err.stack || err);
  });

  }

  //---------- database for todos to be deleted
  private createDatabase(){

    this.donedb = new Dexie("DoneTodosDatabase");
    this.donedb.version(1).stores({
      todos: "_id"
    });
    this.donedb.open().catch(function (err) {
      console.error (err.stack || err);
  });

  }

  
  private registerDate(offlineService: OfflineService) {
    
    offlineService.connectionChanged.subscribe(online => {
    
      console.log(online);
      if (online) {
        console.log('went online');
        console.log('sending all stored items');
       
        //pass the items to the backend if the connetion is enabled
        this.sendItemsFromIndexedDb();
      } else {
        console.log('went offline, storing in indexdb');
        
       
      }
    });
    
  }
}
