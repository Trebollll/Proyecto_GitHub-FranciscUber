import { inject } from "@angular/core";
import { FirebaseAuthentication, User } from '@capacitor-firebase/authentication';
import { NavController } from "@ionic/angular";
import { LoginService } from "../login.service";
import { FirestoreService } from "../servicios/firestore.service";
import { UserI } from "../_models/viajes";




///esta activaaaa (en uso)********
export async function perfilPasajero(){

    const nav = inject(NavController);
    const firestore = inject(FirestoreService);
    const loginSrv = inject(LoginService);
    await loginSrv.firebaseCargando;
    const user = await FirebaseAuthentication.getCurrentUser();
    const uid = user.user?.uid;
    const path = 'Usuarios'
    if(user.user){
        await firestore.getDoc<UserI>(path, uid).subscribe(res => {
            if(res?.perfil === "pasajero"){
                return true;
            }else{ 
                nav.navigateRoot('/home');
                return false;
            }
          })
    }
}



///esta activaaaa (en uso)********
export async function perfilConductor(){

    const nav = inject(NavController);
    const firestore = inject(FirestoreService);
    const loginSrv = inject(LoginService);
    await loginSrv.firebaseCargando;
    const user = await FirebaseAuthentication.getCurrentUser();
    const uid = user.user?.uid;
    const path = 'Usuarios'
    if(user.user){
        await firestore.getDoc<UserI>(path, uid).subscribe(res => {
            if(res?.perfil === "conductor"){
                return true;
            }else{ 
                nav.navigateRoot('/home');
                return false;
            }
          })
    }
}



export async function logeadoGuard(){

    const nav = inject(NavController);
    const loginSrv = inject(LoginService);
    await loginSrv.firebaseCargando;
    const user = await FirebaseAuthentication.getCurrentUser();

    if(user.user){//hay un usuario logeado
        return true;
    }else{
        //no hay usuario
        //mandar a la pagina definida
        nav.navigateRoot('/loginpasajero');
        return false;
    }
}


export async function visitaGuard(){

    const nav = inject(NavController);
    const loginSrv = inject(LoginService);
    await loginSrv.firebaseCargando;
    const user = await FirebaseAuthentication.getCurrentUser();

    if(user.user){//hay un usuario logeado
        nav.navigateRoot('/home');
        return false;
    }else{
        return true;
    }
}








    
