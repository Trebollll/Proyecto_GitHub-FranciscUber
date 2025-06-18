import { Component, inject, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';


@Component({
  selector: 'app-solicitar-viajes',
  templateUrl: './solicitar-viajes.page.html',
  styleUrls: ['./solicitar-viajes.page.scss'],
})
export class SolicitarViajesPage implements OnInit {

  viajes: any[]=[];
  datos=inject(DatosService);


  
  constructor() { }

  async ngOnInit() {
    this.datos.mostrarViajesSolicitados().subscribe(viajes =>{
      this.viajes = viajes;
    });
  }

  cancelarViaje(id:string){
    this.datos.rechazarViaje(id);
  }

  

  



}

