import { Component, inject } from '@angular/core';
import { AnimationController, LoadingController, NavController, ToastController, ViewDidEnter, ViewWillEnter } from '@ionic/angular';
import { LoginService } from '../login.service';
import { lastValueFrom, timer } from 'rxjs';

@Component({
  selector: 'app-loginpasajero',
  templateUrl: './loginpasajero.page.html',
  styleUrls: ['./loginpasajero.page.scss'],
})
export class LoginpasajeroPage implements ViewDidEnter,ViewWillEnter {

  email = '';
  password = '';
  /*usuarioPasaj:string = '';
  passPasaj:string = '';*/
  
  loaderSrv = inject(LoadingController);
  toastSrv = inject(ToastController);
  loginSrv = inject(LoginService);
  nav = inject(NavController);
  constructor() {
  }
  

  ionViewWillEnter(): void {
    
  }

  ionViewDidEnter(): void {
    
  }

  async ingresar(){
    try {
      await this.loginSrv.login(this.email, this.password)
      this.nav.navigateRoot('/home');

      const loader = await this.loaderSrv.create({
        message: 'Cargando....',
        duration:3000
      });
      await loader.present();
      await lastValueFrom(timer(1000));
      await loader.dismiss();

    }catch (error:any){
     const toast =  await this.toastSrv.create({
      message:error.message,
      duration:3000
     });
     console.log(error);
     toast.present();

    }
  }

   // validacion para el menu del component 
   onRecargarDatos(){
    this.loginSrv.refreshUserState();
  }

  recargarYingresar(){
    this.loginSrv.refreshUserState();
    this.ingresar();
    
  }


}
