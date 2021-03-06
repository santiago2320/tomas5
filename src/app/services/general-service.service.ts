import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {

  apiUrl:string = 'https://toma5digital.herokuapp.com/api/';
  

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

  getUnidadesNegocio():Observable<any>{
    let url = this.apiUrl + "unidades_negocio";
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

  getTablaEntradas():Observable<any>{
    var filter = {    
      include: ["usuario","encuesta","localizacion"]
    };
    let url = this.apiUrl + "entradas?filter=" + JSON.stringify(filter);
    return this.http.get<any>(url, this.getHeaders());
  }

  getTablaRespuestas():Observable<any>{
    var filter = {    
      include: [{
        relation: 'pregunta',
        scope: {}
      },{
        relation: 'item',
        scope: {}
      },{
        relation: 'entrada',
        scope: {
          include: [{
            relation: 'usuario',
            scope: {
            }
          },{
            relation: 'localizacion',
            scope: {}
          },{
            relation: 'encuesta',
            scope: {}
          }]
        }
      }]
    };
    let url = this.apiUrl + "respuestas?filter=" + JSON.stringify(filter);
    return this.http.get<any>(url, this.getHeaders());
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

  getUsuarioById(id):Observable<any>{
    let url = this.apiUrl + "usuarios/" + id;
    return this.http.get<any>(url, this.getHeaders());
  }

  getEntradasFilter(filter):Observable<any>{
    let url = this.apiUrl + "entradas?filter=" + JSON.stringify(filter);
    return this.http.get<any>(url, this.getHeaders());
  }  

}
