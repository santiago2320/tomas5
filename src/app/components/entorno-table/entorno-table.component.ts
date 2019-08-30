import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-entorno-table',
  templateUrl: './entorno-table.component.html',
  styleUrls: ['./entorno-table.component.css']
})
export class EntornoTableComponent implements OnInit {

  @Input() infoPaso: any;
  riesgo: any [];

  constructor() { }

  ngOnInit() {
  }

}
