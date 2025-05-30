import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { InteraccionService } from '../servicios/interaccion.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit {

  loginSrv = inject(LoginService);
  interaccion = inject(InteraccionService);
  nav = inject(NavController);
  

  constructor() { }

  ngOnInit() {
  }

    
  async logout(){
    await this.loginSrv.cerrarSession();
    this.interaccion.presentToast('Sesion finalizada!');
    this.nav.navigateRoot('/loginpasajero')
  }

  
  

}
