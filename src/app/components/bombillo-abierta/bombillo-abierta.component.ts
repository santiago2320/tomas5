import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bombillo-abierta',
  templateUrl: './bombillo-abierta.component.html',
  styleUrls: ['./bombillo-abierta.component.css']
})
export class BombilloAbiertaComponent implements OnInit {

	@Input() infoPaso: any;

  constructor() { }

  ngOnInit() {
  }

}
