import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

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

  /*servicios para leer y responder las encuestas*/

  getEncuestaById(id):Observable<any>{
  	let filter = {
      include: [
        {
          relation: 'preguntas',
          scope: {
            include: [{
              relation: 'items',
              scope: {}
            }]
          }
        }
      ]};
    let url = this.apiUrl + "encuestas/"+ id +'?filter=' + JSON.stringify(filter);
    return this.http.get<any>(url, this.getHeaders());
  }

  postRespuesta(data):Observable<any>{
    let url = this.apiUrl + "respuestas";
    return this.http.post<any>(url, data, this.getHeaders());
  }
}
