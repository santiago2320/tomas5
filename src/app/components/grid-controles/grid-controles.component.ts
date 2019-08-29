import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid-controles',
  templateUrl: './grid-controles.component.html',
  styleUrls: ['./grid-controles.component.css']
})
export class GridControlesComponent implements OnInit {
	
	@Input() infoPaso: any;
	control: any[];

  constructor() { }

  ngOnInit() {
  }

}
