import { Component, OnInit, Input } from '@angular/core';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {

	@Input() infoPaso: any;

  constructor() { }

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
  }

}
