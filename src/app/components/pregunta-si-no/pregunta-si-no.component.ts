import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pregunta-si-no',
  templateUrl: './pregunta-si-no.component.html',
  styleUrls: ['./pregunta-si-no.component.css']
})
export class PreguntaSiNoComponent implements OnInit {

	@Input() infoPaso: any;

  constructor() { }

  ngOnInit() {
  }

}
