import { Component, OnInit, Input } from '@angular/core';
import {GeneralServiceService}from 'src/app/services/general-service.service';
import {SincronizacionService} from 'src/app/services/sincronizacion.service'; 
import * as html2pdf from 'html2pdf.js';
declare var _ : any;

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {

	@Input() infoPaso: any;

  infoEntrada: any;  

  constructor(private generalService: GeneralServiceService,private sincronizacionService: SincronizacionService) { }

  onExportClick() {  	
		const options = {
      filename: 'file.pdf',
      image: { type: 'jpeg' },
      html2canvas: {},
      jsPDF: { format: 'c5', orientation: 'landscape' }
    };    
    var content = document.getElementById('toexport');    	    
    html2pdf()
      .from(content)
      .set(options)
      .save();     	
  }

  ngOnInit() {
    this.getInfoCertificado();
  }  

  getInfoCertificado(){
    let infoEncuesta = JSON.parse(window.localStorage.infoEncuesta);
    let infoCertificado = JSON.parse(window.localStorage.infoUsuario);
    function formatDate(fecha) {
      var date = new Date(fecha);
      var monthNames = [
        "Ene", "Feb", "Mar",
        "Abr", "May", "Jun", "Jul",
        "Ago", "Sep", "Oct",
        "Nov", "Dic"
      ];
    ​
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
    ​
      return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }
    this.infoEntrada = {nombre:infoCertificado.nombre,cedula:infoCertificado.cedula,localizacion:infoCertificado.localizacion,fecha:formatDate(infoEncuesta.fecha),encuesta:infoEncuesta.encuesta};    
  }

}


