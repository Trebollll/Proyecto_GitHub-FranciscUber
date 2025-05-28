import { Component, inject } from '@angular/core';
import { LoginService } from './login.service';
import { NavController } from '@ionic/angular';
import { InteraccionService } from './servicios/interaccion.service';
import { FirebaseAuthentication, User } from '@capacitor-firebase/authentication';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {



  user: User|null = null;
  userCondition: boolean | null = null;

  loginSrv = inject(LoginService);
  interaccion = inject(InteraccionService);
  nav = inject(NavController);

 

  
  constructor() {
    
    
  }

  ionViewWillEnter(): void {
    
  }

  ionViewDidEnter(): void {
    
  }

  
  async ngOnInit(){

   FirebaseAuthentication.addListener('authStateChange',(u)=>{
      if(u.user){
        this.userCondition= true;
      }else{
        this.userCondition = false;
      }
    },);

    
  }


  
  async logout(){
    await this.loginSrv.cerrarSession();
    this.interaccion.presentToast('Sesion finalizada!');
    this.nav.navigateRoot('/loginpasajero')
  }


  
  }



    

  

  

  



