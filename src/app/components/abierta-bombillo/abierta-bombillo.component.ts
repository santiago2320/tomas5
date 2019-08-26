import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-abierta-bombillo',
  templateUrl: './abierta-bombillo.component.html',
  styleUrls: ['./abierta-bombillo.component.css']
})
export class AbiertaBombilloComponent implements OnInit {

	@Input() infoPaso: any;

  constructor() { }

  ngOnInit() {
  }

}
