import { Component, inject, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { LoginService } from '../login.service';

import { FirestoreService } from '../servicios/firestore.service';
import { UserI } from '../_models/viajes';
import { InteraccionService } from '../servicios/interaccion.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

 // usuarioCond:string = '';

 userCondition: boolean | null = null;

 data : string = "";
  edad: any = 'edad';
  nombre: any = 'nombre';
  uid: any = '';
  info: UserI = {
    nombre : '',
    correo : '',
    edad: '',
    uid : '',
    password : '',
    password2 : '',
    perfil : '',
  };
  navController = inject(NavController);
  loginSrv = inject(LoginService);
  firestore = inject(FirestoreService);
  interaccion = inject(InteraccionService);
  alertController = inject (AlertController);
  nav = inject(NavController);
  
  constructor() { }

  async ngOnInit() {
    //no tengo muy claro si este es necesario (esta activo de todos modos )
    this.loginSrv.estadoUser2();
    //
    this.getUid2();

  }

  

  //(en uso)
  async getUid2(){
    await this.loginSrv.firebaseCargando;
    const uid = await this.loginSrv.getUid2();
    if(uid){
      this.uid = uid;
      console.log('uid estado user perfil ->', this.uid);
      this.getInforUser(); 
    }else {
      console.log('nadie logeado perfil ->');
    }  
  }

  //en Uso (no auth)
  getInforUser(){
    const path = 'Usuarios'
    const id = this.uid;
    this.firestore.getDoc<UserI>(path, id).subscribe(res => {
      if(res){
        if(res.perfil == "conductor"){
          this.userCondition = true;
        }else{
          this.userCondition = false;
        }
        this.info = res;
        this.data = res.perfil;
        
        
      }
      console.log('datos son tipo perfil->' ,this.data)
      console.log('user condition ->' ,this.userCondition)
    })
  }

  async editar(name: string){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar '+name,
      inputs: [
        {
          name: name,
          type: 'text',
          placeholder: 'Ingresar tu '+name
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirmar ');
          }
        }, {
          text: 'Aceptar ',
          handler: (ev)=>{
            console.log('Confirmar OK',ev);
            this.saveDatos(name,ev[name])
          }
        }
      ]
    });
    await alert.present();
  }

  
  async saveDatos( name:string,input: any){
    await this.interaccion.presentLoading('Actualizando...')
    const path = 'Usuarios'
    const id = this.uid;
    const updateDoc: any ={};
    updateDoc[name] = input;
    this.firestore.updateDoc(path, id,updateDoc).then(() => {
    this.interaccion.presentToast('Actualizado con éxito')
    this.interaccion.closeLoading();
    });
  }

  async logout(){
    await this.loginSrv.cerrarSession();
    this.interaccion.presentToast('Sesion finalizada!');
    this.nav.navigateRoot('/loginpasajero')
  }









}

