import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carga-home',
  templateUrl: './carga-home.component.html',
  styleUrls: ['./carga-home.component.css']
})
export class CargaHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  	setTimeout(()=>{
  		this.router.navigate(['/login']);
  	},8500);
  }

}
