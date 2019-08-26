import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-abierta',
  templateUrl: './abierta.component.html',
  styleUrls: ['./abierta.component.css']
})
export class AbiertaComponent implements OnInit {
  @Input () infopaso: any;

  constructor() { }

  ngOnInit() {
    this.infopaso = {pregunta:"pregunta",id:1}
  }

}
