import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid-riesgos',
  templateUrl: './grid-riesgos.component.html',
  styleUrls: ['./grid-riesgos.component.css']
})
export class GridRiesgosComponent implements OnInit {
	
	@Input() infoPaso: any;
	riesgo: any[];

  constructor() { }

  ngOnInit() {
  }

}
