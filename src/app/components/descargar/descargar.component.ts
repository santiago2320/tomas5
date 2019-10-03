import { Component, OnInit } from '@angular/core';
import { ExcelExportService } from '../../services/excel-export.service';
import {GeneralServiceService}from 'src/app/services/general-service.service';
import { forkJoin } from 'rxjs';
declare var _ : any;

@Component({
  selector: 'app-descargar',
  templateUrl: './descargar.component.html',
  styleUrls: ['./descargar.component.css']
})
export class DescargarComponent implements OnInit {
	name:string;
	sName:string;
	fileName:string;
	excelFileName:string;
	blobType: string = 'aplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UFT-8';

  constructor(private excelJsService: ExcelExportService,private generalService: GeneralServiceService) {
  	
  }

  ngOnInit() {
    this.name = 'entradasToma5';
    this.fileName = 'entradasToma5';
    this.sName = 'entradasToma5';
    this.excelFileName = 'entradasToma5.xlsx';
    this.generalService.login({"username":"admin", "password":"wakanda"}).subscribe(res=>{
      console.log(res);
      window.localStorage.setItem("token",res.id); 
    });
    
  }


  downloadEntradas(){
    console.log("Descargando info");
    this.generalService.getTablaEntradas().subscribe(res=>{
      console.log("Llego la info");
      var tablaEntradas = [];
      let entradas = res;
      _.forEach(entradas,entra=>{
          //entra -> entradas[i];
          var datos = {id:0};
          datos.id = entra.id;
          this.leerEntrada(datos,entra);
          tablaEntradas.push(datos);
      });
      let cols = ["Id Entrada","Fecha","Planta","Codigo Planta","Encuesta","Usuario","Cedula","Es Contratista","Empresa Contratista","Unidad Negocio"];
      this.excelJsService.exportToExcelEntradas(this.name,this.sName,this.fileName,this.excelFileName,this.blobType,cols,tablaEntradas);
    });
  }
  downloadRespuestas(){
    console.log("Descargando info");
    this.generalService.getTablaRespuestas().subscribe(res=>{
      console.log("Llego la info");
      var tablaRespuestas = [];
      let respuestas = res;
      respuestas = _.filter(respuestas,function(res){
        return res.respuesta != "...";
      });
      _.forEach(respuestas,resp=>{
          var datos = {id_entrada:0,preguntaPrincipal:"",preguntaSecundaria:"",
            respuesta:""
          };
          datos.id_entrada = resp.id_entrada;
          if(resp.entrada){
            this.leerEntrada(datos,resp.entrada);
          }
          datos.preguntaPrincipal = "Error (Pregunta no encontrada)";
          datos.preguntaSecundaria = "..."
          datos.respuesta = resp.respuesta;
          if(resp.pregunta){
            datos.preguntaPrincipal = resp.pregunta.pregunta;
          }
          if(resp.item){
            datos.preguntaSecundaria = resp.item.pregunta;
          }
          tablaRespuestas.push(datos);
      });
      let cols = ["Id Entrada","Fecha","Planta","Codigo Planta","Encuesta","Usuario","Cedula","Pregunta principal","Pregunta secundaria","Respuesta","Es Contratista","Empresa Contratista","Unidad Negocio"];
      this.excelJsService.exportToExcel("respuestasToma5","respuestasToma5","respuestasToma5","respuestasToma5.xlsx",this.blobType,cols,tablaRespuestas);
    });
  }

  leerEntrada(datos,entra){
      datos.fecha = new Date(entra.fecha);
      if (entra.localizacion) {
        datos.localizacion = entra.localizacion.nombre;
        datos.codigoLocalizacion = entra.localizacion.codigo;
      }
      else {
        datos.localizacion = "Error(localizacion no encontrada)";
        datos.codigoLocalizacion = "Error(localizacion no encontrada)";
      }  
      if (entra.encuesta) {
        datos.encuesta = entra.encuesta.nombre;        
      }
      else {
        datos.encuesta = "Error(encuesta no encontrada)";
      }   
      if (entra.usuario) {
        datos.usuario = entra.usuario.nombre;
        datos.cedula = entra.usuario.cedula;
        if (entra.usuario.is_contratista) {
          datos.is_contratista = entra.usuario.is_contratista;
        }else{
          datos.is_contratista = "Error(validación de usuario no encontrada)";
        }
        if (entra.usuario.empresa_contratista) {
          datos.empresa_contratista = entra.usuario.empresa_contratista;
        }else{
          datos.empresa_contratista = "(Empresa contratista no encontrada/no relacionada)";
        }
        if (entra.usuario.unidad_negocio) {
          datos.unidad_negocio = entra.usuario.unidad_negocio;
        }else{
          datos.unidad_negocio = "Error(Unidad de negocio no encontrada)";
        }
      }
      else {
        datos.usuario = "Error(usuario no encontrado)";
        datos.cedula = "Error(usuario no encontrado)";
      }
  }


}
