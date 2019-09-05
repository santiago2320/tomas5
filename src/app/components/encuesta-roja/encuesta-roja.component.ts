import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta-roja',
  templateUrl: './encuesta-roja.component.html',
  styleUrls: ['./encuesta-roja.component.css']
})
export class EncuestaRojaComponent implements OnInit {

  proceso: any [];

  pasoActual: any;

  indexActual: number;

  textoHeader: any;

  constructor(private router: Router) { }

  ngOnInit() {

    this.proceso = [
      {tipo:"titulo",  infoPaso:{titulo:"Esta inspección se debe realizar antes del ingreso a descargue en obra de un cliente y garantizar la integridad del operador, las demas personas que se encuentren alrededor y los vehículos.", id:1}},
      {tipo:"riesgosEntorno", infoPaso:{pregunta:"Riesgos mi entorno seguro.", riesgosEntorno:[
                    {pregunta:"1. Terreno destapado / Fangoso / Inundado / Derrumbe", id:1},
                    {pregunta:"2. Materiales de construcción o escombros mal ubicados.", id:2},
                    {pregunta:"3. Excavaciones abiertas y profundas.", id:3},
                    {pregunta:"4. Pendientes pronunciadas.", id:4},
                    {pregunta:"5. Relación peso/terreno.", id:5},
                    {pregunta:"6. Espacio acorde con las dimensiones del vehículo(1x1).", id:6},
                    {pregunta:"7. Inclemencias del tiempo Fuertes vientos o lluvias. ", id:7},
                    {pregunta:"8. Movimientos vehículos/maquinaria/peatones.", id:8},
                    {pregunta:"9. Existencia de cables aéreos o líneas energizadas.", id:9},
                    {pregunta:"10. Existe posibilidad de perdida de tracción.", id:10},
                    {pregunta:"11. Se requiere apoyo de personal de manejo de tráfico.", id:11},
                    {pregunta:"12. Terreno desnivelado con depresiones o montículos.", id:12},
                    {pregunta:"13. Empozamiento de agua.", id:13},
                    {pregunta:"14. Riesgos de tropezones o resbalones.", id:14},
                    {pregunta:"15. Riesgo de golpes por caída de objetos.", id:15},
                    {pregunta:"16. Malas condiciones de iluminación.", id:16},
                    {pregunta:"17. Cargas suspendidas sobre el vehículo.", id:17},
                    {pregunta:"18. Acoples para descargue en silo superiores a 1m de altura (cisterna).", id:18},
      ]}},
      {tipo:"entorno",  infoPaso:{pregunta:"pregunta1",riesgos: [
                    {pregunta:"1. Terreno destapado / Fangoso / Inundado / Derrumbe.", id:1},
                    {pregunta:"2. Materiales de construcción o escombros mal ubicados.", id:2},
                    {pregunta:"3. Excavaciones abiertas y profundas.", id:3},
                    {pregunta:"4. Pendientes pronunciadas.", id:4},
                    {pregunta:"5. Relación peso/terreno.", id:5},
                    {pregunta:"6. Espacio acorde con las dimensiones del vehículo(1x1).", id:6},
                    {pregunta:"7. Inclemencias del tiempo Fuertes vientos o lluvias. ", id:7},
                    {pregunta:"8. Movimientos vehículos/maquinaria/peatones.", id:8},
                    {pregunta:"9. Existencia de cables aéreos o líneas energizadas.", id:9},
                    {pregunta:"10. Existe posibilidad de perdida de tracción.", id:10},
                    {pregunta:"11. Se requiere apoyo de personal de manejo de tráfico.", id:11},
                    {pregunta:"12. Terreno desnivelado con depresiones o montículos.", id:12},
                    {pregunta:"13. Empozamiento de agua.", id:13},
                    {pregunta:"14. Riesgos de tropezones o resbalones.", id:14},
                    {pregunta:"15. Riesgo de golpes por caída de objetos.", id:15},
                    {pregunta:"16. Malas condiciones de iluminación.", id:16},
                    {pregunta:"17. Cargas suspendidas sobre el vehículo.", id:17},
                    {pregunta:"18. Acoples para descargue en silo superiores a 1m de altura (cisterna).", id:18},
      ]}},      
                                     
    ];

    this.indexActual = 0;
    this.pasoActual = this.proceso[this.indexActual];    
    if(this.pasoActual.tipo == "titulo"){
      this.textoHeader = "Análisis de Riesgos";
    }else {
      this.textoHeader = "Mi entorno seguro";
    }

  }

  nextStep() {
    if(this.indexActual< this.proceso.length -1){
      var mensaje = this.validations();
      if(mensaje=="OK"){
        this.indexActual++;
       this.pasoActual = this.proceso[this.indexActual];
      }else{
        alert(mensaje);        
      }
    }else {
      this.router.navigate(['/escoger']);
    }
  }

  logPaso() {
    console.log(this.pasoActual);
  }


  validations(){
    var mensaje: string;
    var counter: number;
    mensaje = "OK";

    if (this.pasoActual.tipo == 'riesgosEntorno') {
      this.pasoActual.infoPaso.riesgosEntorno.forEach((riesgo)=>{
        if( riesgo.hasOwnProperty('check') ) {
          counter ++;
         }
         else{
           mensaje="Selecciona una respuesta para cada control";
          }
      });
    }
    return mensaje;
  }

}
