import { Component, OnInit } from '@angular/core';
import { ExcelExportService } from '../../services/excel-export.service';


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
	cols = ["Column1","Column2","Column3","Column4","Column5"];
	data = [{col1:"aaa1",col2:"b1",col3:"c1",col4:"d1",col5:"e1"},
	{col1:"a2",col2:"b2",col3:"c2",col4:"d2",col5:"e2"},
	{col1:"a3",col2:"b3",col3:"c3",col4:"d3",col5:"e3"},
	{col1:"a4",col2:"b4",col3:"c4",col4:"d4",col5:"eee4"},
	{col1:"a5",col2:"b5",col3:"c5",col4:"d5",col5:"e5"}];

  constructor(private excelJsService: ExcelExportService) {
  	this.sName = 'sheetData';
  	this.excelFileName = 'TestE.xlsx';
  }

  ngOnInit() {
  }
  exportToExcel(){
  	this.excelJsService.exportToExcel(this.name,this.sName,this.fileName,this.excelFileName,this.blobType,this.cols,this.data);
  }


}
