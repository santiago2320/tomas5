import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioOfflineService {

  constructor( private httpClient: HttpClient) {

    this.createIndexedDatabase();
    this.createDatabase();
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

}
