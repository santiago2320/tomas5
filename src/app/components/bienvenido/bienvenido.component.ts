import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  	setTimeout(()=>{
  		this.router.navigate(['/encuestaazul']);
  	},3500);
  }

}
