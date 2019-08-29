import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encuesta-roja',
  templateUrl: './encuesta-roja.component.html',
  styleUrls: ['./encuesta-roja.component.css']
})
export class EncuestaRojaComponent implements OnInit {

  proceso: any [];

  constructor() { }

  ngOnInit() {
    this.proceso = [
      {tipo:"entorno",  infoPaso:{pregunta:"pregunta1",riesgos: [
        {pregunta:"1 Terreno destapado/Fangoso/Inundado/Derrumbe", id:1},
        {pregunta:"1 Materiales de construcción o escombros mal ubicados ", id:1},
        {pregunta:"1 Excavaciones abiertas y profundas", id:1},
        {pregunta:"1 Pendientes pronunciadas ", id:1},
        {pregunta:"1 Relacion peso/terreno", id:1},
        {pregunta:"1 Espacio acorde con las dimensiones del vehiculo (1x1)", id:1},
        {pregunta:"1 Inclemencias del tiempo fuerte vientos y lluvias ", id:1},
        {pregunta:"1 Movimiento de vehiculos/maquinarias/peatones", id:1},
        {pregunta:"1 Entrar en contacto / golpes con partes móviles de máquinas.", id:1},
      ]},
                                 
    }
    ];

  }

}
