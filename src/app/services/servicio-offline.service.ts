import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

declare const window: any; //declare window object

@Injectable({
  providedIn: 'root'
})
export class ServicioOfflineService {

  private internalConnectionChanged = new Subject<boolean>();

  constructor() {
    //private httpClient: HttpClient --contrucctor--


    //this.createIndexedDatabase();
    //this.createDatabase();

    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());
   }

  //private db: any;
  //private donedb: any;

  // ---------- create the indexedDB
  //private createIndexedDatabase(){

    //this.db = new Dexie("DataBasetomas");
    //this.db.version(1).stores({
      //todos: "title,content,done"
    //});
    //this.db.open().catch(function (err) {
      //console.error (err.stack || err);
  //});

  get connectionChanged() {
    return this.internalConnectionChanged.asObservable();
  }  

  get isOnline() {
    return !!window.navigator.onLine;
  }

  private updateOnlineStatus() {  
    this.internalConnectionChanged.next(window.navigator.onLine);
  }

}

  //---------- database for todos to be deleted
  //private createDatabase(){

    //this.donedb = new Dexie("DoneTodosDatabase");
    //this.donedb.version(1).stores({
      //todos: "_id"
    //});
    //this.donedb.open().catch(function (err) {
      //console.error (err.stack || err);
  //});

  //}

//}
