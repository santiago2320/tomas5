import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-riesgos-entorno',
  templateUrl: './riesgos-entorno.component.html',
  styleUrls: ['./riesgos-entorno.component.css']
})
export class RiesgosEntornoComponent implements OnInit {

	@Input() infoPaso: any;
	riesgoEntorno: any[];

  constructor() { }

  ngOnInit() {
  }

}
