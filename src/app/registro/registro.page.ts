import { Component, OnInit, inject } from '@angular/core';
import { ViewDidEnter, NavController, AlertController } from '@ionic/angular';
import { UserI } from '../_models/viajes';
import { FirestoreService } from '../servicios/firestore.service';
import { InteraccionService } from '../servicios/interaccion.service';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit,ViewDidEnter {


  datos: UserI = {
    nombre: "",
    correo: "",
    edad: "",
    uid: null,
    password: "",
    password2: "",
    perfil: "",
  }
  emaill= '';
  password= '';
  password2= '';
  
  interaccion = inject(InteraccionService);
  firestore = inject(FirestoreService);
  alert = inject(AlertController);
  nav = inject(NavController);

  

  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    
  }

  ionViewDidEnter(): void {
  
  }

  


///Funcionando Sin el Auth******************************************************************(en uso)
async registro333(email:string,password:string){
  try{
    if(this.password != this.password2){
      throw {message:'La contraseña no coincide'}
    }
    this.interaccion.presentLoading('Registrando...')
    const resultado = await FirebaseAuthentication.createUserWithEmailAndPassword({
      email,
      password
    });
    this.nav.navigateRoot('/home')
    if(resultado){
      const path = 'Usuarios';
      const id = resultado.user?.uid   
      this.datos.uid = id,
      this.datos.password= null,
      this.datos.password2= null,
      await this.firestore.createDoc(this.datos, path, id)
      this.interaccion.closeLoading();
      this.interaccion.presentToast('Registrado con éxito')
    }
  }catch(error:any){
    if(error.message.includes('(auth/email-already-in-use)')){
      error.message = 'El usuario ya existe';
    }
    const alert = await this.alert.create({
      message:error.message,
      buttons: ['OK']
    });
    alert.present();
  }
}



  }


