import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {

  apiUrl:string = 'http://localhost:3030/api/';

  constructor(private http:HttpClient) { }

  getHeaders(){
    var token = window.localStorage.token;
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return httpOptions;
  }

  /*specific services*/
  login(data):Observable<any>{
    let url = this.apiUrl + "users/login";
    return this.http.post<any>(url, data);
  }


  getLocalizaciones():Observable<any>{
    let url = this.apiUrl + "localizaciones";
    return this.http.get<any>(url, this.getHeaders());
  }

  getUsuariosFilter(filter):Observable<any>{
    let url = this.apiUrl + "usuarios?filter=" + JSON.stringify(filter);
    return this.http.get<any>(url, this.getHeaders());
  }

  postUsuario(usuario):Observable<any> {
    let url = this.apiUrl + "usuarios";
    return this.http.post<any>(url, usuario, this.getHeaders());
  }

  getEncuestasFilter(filter):Observable<any>{
    let url = this.apiUrl + "encuestas?filter=" + JSON.stringify(filter);
    return this.http.get<any>(url, this.getHeaders());
  }

  postEntrada(data):Observable<any>{
    let url = this.apiUrl + "entradas";
    return this.http.post<any>(url, data, this.getHeaders());
  }
  
  /*standar services*/

  getEncuestas():Observable<any>{
    let url = this.apiUrl + "encuestas";
    return this.http.get<any>(url, this.getHeaders());
  }

  getEntradas():Observable<any>{
    let url = this.apiUrl + "entradas";
    return this.http.get<any>(url, this.getHeaders());
  }

  getItemsLista():Observable<any>{
    let url = this.apiUrl + "items_lista";
    return this.http.get<any>(url, this.getHeaders());
  }

  

  getPreguntas():Observable<any>{
    let url = this.apiUrl + "preguntas";
    return this.http.get<any>(url, this.getHeaders());
  }

  getRespuestas():Observable<any>{
    let url = this.apiUrl + "respuestas";
    return this.http.get<any>(url, this.getHeaders());
  }

  getUsuarios():Observable<any>{
    let url = this.apiUrl + "usuarios";
    return this.http.get<any>(url, this.getHeaders());
  }

}
