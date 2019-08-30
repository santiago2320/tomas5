import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {

  apiUrl:string = 'http://localhost:3000/api/';

  constructor(private http:HttpClient) { }

  getEncuestas():Observable<any>{
    let url = this.apiUrl + "encuestas";
    return this.http.get<any>(url);
  }

  getEntradas():Observable<any>{
    let url = this.apiUrl + "entradas";
    return this.http.get<any>(url);
  }

  getItemsLista():Observable<any>{
    let url = this.apiUrl + "items_lista";
    return this.http.get<any>(url);
  }

  getLocalizaciones():Observable<any>{
    let url = this.apiUrl + "localizaciones";
    return this.http.get<any>(url);
  }

  getPreguntas():Observable<any>{
    let url = this.apiUrl + "preguntas";
    return this.http.get<any>(url);
  }

  getRespuestas():Observable<any>{
    let url = this.apiUrl + "respuestas";
    return this.http.get<any>(url);
  }

  getUsuarios():Observable<any>{
    let url = this.apiUrl + "usuarios";
    return this.http.get<any>(url);
  }

}
