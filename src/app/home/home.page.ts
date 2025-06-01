import { Component, inject } from '@angular/core';
import { LoginService } from '../login.service';
import { NavController } from '@ionic/angular';
import { FirestoreService } from '../servicios/firestore.service';
import { DatosService } from '../datos.service';
import { InteraccionService } from '../servicios/interaccion.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userCondition: boolean | null = null;
  
  datos=inject(DatosService);
  interaccion = inject(InteraccionService);
  LoginSrv = inject(LoginService);
  nav = inject(NavController);
  firestore = inject(FirestoreService);


  constructor() {}

  ngOnInit() {
    this.datos.tipousuario2().subscribe(condition => {
      this.userCondition = condition });
  }

  async logout(){
    await this.LoginSrv.cerrarSession();
    this.interaccion.presentToast('Sesion finalizada!');
    this.nav.navigateRoot('/loginpasajero')
  }


  getViajes(){
    
  }

  

}
