import { inject } from "@angular/core"
import { LoginService } from "../login.service"
import { NavController } from "@ionic/angular";
import { FirestoreService } from "../servicios/firestore.service";

export const authGuard = async () => {
    const firestore = inject(FirestoreService);
    const login = inject(LoginService);
    const nav = inject(NavController);
    

    /*if(!login.logeado){
        nav.navigateRoot('/',{replaceUrl:true});
    }
    return login.logeado;

}

export const guestGuard = async () => {
    const login = inject(LoginService);
    const nav = inject(NavController);
    await login.firebaseCargado;

    if(login.logeado){
        nav.navigateRoot('/conductor',{replaceUrl:false});
    }
    return !login.logeado;*/

}