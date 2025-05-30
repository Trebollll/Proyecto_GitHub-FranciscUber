import { inject, Injectable } from '@angular/core';
import { Viaje } from './_models/viajes';
import { from, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { LoginService } from './login.service';
import { FirestoreService } from './servicios/firestore.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseAuthentication, User } from '@capacitor-firebase/authentication';
import { switchMap } from 'rxjs/operators';
import { InteraccionService } from './servicios/interaccion.service';

@Injectable({
  providedIn: 'root'
})
export class DatosService  {


  private collectionName = 'Viajes';
  ///

  user:User|null = null;

  rol2: boolean = false;
  firestoreA = inject(AngularFirestore);
  firestore = inject(FirestoreService);
  interaccion = inject(InteraccionService);
  nav = inject(NavController);
  loginSrv = inject(LoginService);

  firebaseCargado: Promise<void>;

 
  

  constructor() {
    this.firebaseCargado = new Promise<void>((resolve)=>{
      FirebaseAuthentication.addListener('authStateChange',(status)=>{
        this.user = status.user;
        resolve();// con esto le decimos que ya cargo firebase, resolvemos la promesa
      })
    });
    
   }


//SIN AUTH (EN USO)
tipousuario2(): Observable<boolean | null>{
  return from(FirebaseAuthentication.getCurrentUser()).pipe(
    switchMap((user) => {
      if (user && user.user && user.user.uid){
        const uid = user.user.uid;
        console.log("uid obtenido ", uid);
        return this.firestoreA.collection('Usuarios').doc(uid).get().pipe(
          map((docSnapshot) => {
            if (docSnapshot.exists){
              const userData = docSnapshot.data() as any;
              console.log('datos del usuario ', userData);
              if(userData.perfil === 'conductor') {
                return true;
              }else{
                return false;
              }
            }else{
              return null;
            }
          }),
          catchError(() => {
            return of(null);
          })
        );
      }else{
        return of(null);
      }
    }),
    catchError((error) => {
      console.log('error al wea' , error);
      return of(null);
    })
  );
}

//original EN USO
  agregarViaje(Viaje: Omit<Viaje, 'id'>): Promise<void>{
    //const id = this.firestoreA.createId();
    //return this.angularFire.currentUser
    return FirebaseAuthentication.getCurrentUser().then((user) =>{
      if(user){
        const id = this.firestore.getId();
        const viajeConUid = {
          ...Viaje,
          id: id,
          usuarioId: user.user?.uid
        };
        return this.firestoreA.collection(this.collectionName).doc(id).set(viajeConUid);
      }else{
        throw new Error('el usuario no esta autenticado');
      }
    });
  }

  //solicitudes de viajes (conductor) EN USO
  obtenerViajeActivosPorUsuario(): Observable<any[]>{
    //return this.angularFire.authState
    return from(FirebaseAuthentication.getCurrentUser()).pipe(
      switchMap(user =>{
        if(user.user?.uid){
          return this.firestoreA.collection('Viajes', ref =>
            ref.where('idPasajero','!=','') 
          ).valueChanges().pipe(
            map(viajes => viajes.filter((viaje: any) => viaje.estado !== 'finalizado' && viaje.usuarioId === user.user?.uid))
          );
        }else{
          return of([]);
        }
      })
    );
  }


  //original  EN USO
  //Mostrar todos los viajes creado por el conductor
  mostrarCreadosConductor(): Observable<any[]>{
  return from(FirebaseAuthentication.getCurrentUser()).pipe(
      switchMap(user =>{
        if(user.user?.uid){
          return this.firestoreA.collection('Viajes', ref =>
            ref.where('usuarioId','==',user.user?.uid)
          ).valueChanges().pipe(
            map(viajes => viajes.filter((viaje:any)=> viaje.estado !== 'finalizado'))
          );
        }else{
          return of([]);
        }
      })
    );
  }

  //Mostrar todos los viajes solicitados por el pasajero EN USO
  mostrarViajesSolicitados(): Observable<any[]>{
    return from(FirebaseAuthentication.getCurrentUser()).pipe(
      switchMap(user =>{
        if(user.user){
          return this.firestoreA.collection('Viajes', ref =>
            ref.where('idPasajero','==',user.user?.uid)
          ).valueChanges();
        }else{
          return[];
        }
      })
    );
  }
  


  //mostrar todos los viajes disponibles EN USO
  viajesDisponibles(): Observable<any[]>{
    return from(FirebaseAuthentication.getCurrentUser()).pipe(
      switchMap(user =>{
        if(user){
          return this.firestoreA.collection('Viajes', ref =>
            ref.where('idPasajero','==','')
          ).valueChanges();
        }else{
          return[];
        }
      })
    );
  }

//mostrar viaje sin auth (ACTIVO) EN USO
mostrarEnCurso2(): Observable<any[]>{
  return from(FirebaseAuthentication.getCurrentUser()).pipe(
    switchMap(user => {
      if (user && user.user){
        const uid = user.user.uid;
        console.log('uid del usuario', uid);
        return this.firestoreA.collection('Viajes', ref => 
          ref.where('estado', '==', 'en_curso')
        ).valueChanges().pipe(
          map(viajes => viajes.filter((viaje: any) => viaje.usuarioId === uid)),
          catchError(() => of ([]))
        );
      }else{
        return of([]);
      }
    }),
    catchError(() => of ([]))
  );
}




//Mostrar viaje actual en curso (Pasajer0) EN USO
mostrarEnCursoPasajero2(): Observable<any[]>{
  return from(FirebaseAuthentication.getCurrentUser()).pipe(
    switchMap(user =>{
      if(user.user?.uid){
        return this.firestoreA.collection('Viajes', ref =>
          ref.where('estado','==','en_curso')
        ).valueChanges().pipe(
          map(viajes => viajes.filter((viaje: any) => viaje.idPasajero === user.user?.uid))
        );
      }else{
        return of([]);
      }
    })
  );
}

  //original EN USO
  solicitudViaje(id: string){
    this.interaccion.presentLoading('Generando Viaje...');
    FirebaseAuthentication.getCurrentUser().then(user =>{
      if(user.user){
        const pasajeroId = user.user.uid;
        this.firestoreA.collection('Viajes').doc(id).update({
          idPasajero: pasajeroId
        }).then(()=> {
          this.interaccion.closeLoading();
          this.interaccion.presentToast('Generado con éxito!')
          this.nav.navigateRoot('/pasajero')
          console.log('Solicitud aceptada');
        }).catch(error => {
          console.error('Error intente nuevamente');
        });
      }else{
        console.log('No hay un usuario autenticado');
      }
    }).catch(error =>{
      console.log('Error al obtener usuario autenticado');
    });
  }

  eliminar(id:string){
    this.interaccion.presentLoading('Eliminando...');
    this.firestoreA.collection('Viajes').doc(id).delete().then(()=>{
      this.interaccion.closeLoading();
      this.interaccion.presentToast('Eliminado con éxito!');
      console.log('Se a eliminado exitosamente');
    }).catch(error =>{
      this.interaccion.closeLoading();
      console.error('error al eliminar ', error)
    });
  }

  //aceptar solicitud de viaje (conductor) en uso
  aceptarViaje(id:string){
    this.interaccion.presentLoading('Cargando...');
    this.firestoreA.collection('Viajes').doc(id).update({
      estado: 'en_curso'
    }).then(()=>{
      this.interaccion.closeLoading();
      this.interaccion.presentToast('Aceptado con éxito!')
      console.log('se acepto el viaje con éxito');
    }).catch (error => {
      this.interaccion.closeLoading();
      console.error('error al aceptar el viaje ',error);
    });
  }

  //rechazar solicitud de viaje (Conductor ) en uso
  rechazarViaje(id:string){
    this.interaccion.presentLoading('Cargando...');
    this.firestoreA.collection('Viajes').doc(id).update({
      estado: 'pendiente',
      idPasajero: ''
    }).then(()=>{
      this.interaccion.closeLoading();
      this.interaccion.presentToast('Viaje rechazado!')
      console.log('viaje rechazado');
    }).catch(error =>{
      this.interaccion.closeLoading();
      console.error('error al rechazar ',error);
    });
  }

  //finalizar viaje  (conductor) EN USO
  finalizar(id:string){
    this.interaccion.presentLoading('Finalizando...');
    this.firestoreA.collection('Viajes').doc(id).update({
      estado: 'finalizado'
    }).then(()=>{
      this.interaccion.closeLoading();
      this.interaccion.presentToast('Finalizado con éxito!')
      console.log('se finalizo viaje con éxito');
    }).catch (error => {
      this.interaccion.closeLoading();
      console.error('error al finalizar el viaje ',error);
    });
  }
  
}
