import { Injectable } from '@angular/core';
import * as Excel from "exceljs/dist/exceljs.min.js";
import * as ExcelProper from "ExcelJS";
import * as FileSaver from 'file-saver';



@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {
	
	colArray = [];
  constructor() { }


  applyRowStyle(sheet){
  	sheet.eachRow(function(row,rowNumber){
  		if (rowNumber > 3) {
  			row.eachCell({ includeEmpty: true }, function(cell,colNumber){
  				sheet.getCell(cell.address.toString()).alignment = {wrapText:true,vertical:'middle',horizontal:'center'};
  				sheet.getCell(cell.address.toString()).border = {
  					top: {style:'thin'},
  					left: {style:'thin'},
  					bottom: {style:'thin'},
  					right: {style:'thin'}
  				};
  				sheet.getCell(cell.address.toString()).font = {
  					name: 'Tahoma',
  					family: 2,
  					size: 8
  				};
  			});
  		}
  	});
  	return sheet;
  }


  exportToExcel(name,sName,fileName,excelFileName,blobType,cols,data){
  	var workbook = new Excel.Workbook();
  	workbook.creator = 'Web';
  	workbook.lastModifiedBy = 'Web';
  	workbook.created = new Date();
  	workbook.modified = new Date();
  	workbook.addWorksheet(sName, {views: [{state:'frozen',ySplit:3,xSplit:2,activeCell:'A1',showGridLines:false}]})
  	var sheet = workbook.getWorksheet(1);
  	var data1 = ['Exported Data'];
  	sheet.addRow(data1);
  	sheet.addRow("");
  	sheet.getRow(3).values = cols;
  	sheet.columns = [
  		{key: 'col1'},
  		{key: 'col2'},
  		{key: 'col3'},
  		{key: 'col4'},
  		{key: 'col5'}
  	];
  	this.colArray = ['A3','B3','C3','D3','E3'];
  	sheet.addRows(data);
  	sheet = this.applyRowStyle(sheet);
  	sheet.getCell('A1','A2').font = {
  		name: 'Tahoma',
  		family: 2,
  		size: 18
  	};
  	this.colArray.map(key => {
  		sheet.getCell(key).fill = {
  			type: 'gradient',
  			degree: 0,
  			stops: [
  				{position:0,color:{argb:'d9f1fa'}},
  				{position:0.5,color:{argb:'d9f1fa'}},
  				{position:1,color:{argb:'d9f1fa'}},
  			]
  		};
  		sheet.getCell(key).alignment = {wrapText:true,verical:'middle',horizontal:'center'};
  		sheet.getCell(key).border = {right: {style:'thin'},top: {style:"thin"}};
  		sheet.getCell(key).font = {
  			name: 'Tahoma',
  			family: 2,
  			size: 18,
  			bold: true
  		};
  	});
  	workbook.xlsx.writeBuffer().then(data => {
  		var blob = new Blob([data],{type: blobType});
  		FileSaver.saveAs(blob,excelFileName,true);
  	});
  }
  
}
