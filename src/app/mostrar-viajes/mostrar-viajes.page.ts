import { Component, inject, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';
import { Viaje } from '../_models/viajes';


@Component({
  selector: 'app-mostrar-viajes',
  templateUrl: './mostrar-viajes.page.html',
  styleUrls: ['./mostrar-viajes.page.scss'],
})
export class MostrarViajesPage implements OnInit {

  
  userCondition: boolean | null = null;
  datosSrv= inject(DatosService);
  viajes: Viaje[] = [];
  
  
  
  
  constructor() {
    
  }

  ngOnInit() {
    this.datosSrv.tipousuario2().subscribe(condition => {
      this.userCondition = condition;
    });

    this.datosSrv.viajesDisponibles().subscribe(viajes =>{
      this.viajes = viajes;
    });
    
    
   
  }

  

  

  solicitudViaje(viaje: string){
    this.datosSrv.solicitudViaje(viaje);
  }


  ionViewDidLeave(): void {
   
  }

  



}
