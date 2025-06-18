import { inject, Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteraccionService {

  toastController = inject(ToastController);
  loadingController = inject(LoadingController);

  loading : any;

  constructor() { }

  async presentToast(mensaje:string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading(mensaje:string){
    this.loading = await this.loadingController.create({
      cssClass: '',
      message: mensaje,
    });
    await this.loading.present();
  }

  async closeLoading(){
    await this.loading.dismiss();
  }


}



