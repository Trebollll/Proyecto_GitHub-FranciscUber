import { inject, Injectable } from '@angular/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserI } from './_models/viajes';
import { User } from 'firebase/auth';
import { FirestoreService } from './servicios/firestore.service';
import {  from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  

  datos: UserI = {
    nombre: "",
    correo: "",
    edad: "",
    uid: null,
    password: "",
    password2: "",
    perfil: "",
  }
  user: User|null = null;
  firestore = inject(AngularFirestore);
  firestoree = inject(FirestoreService);
  
  //test validacion para el menu del component 
  private userSubject = new BehaviorSubject<boolean>(false);

  cargarFirebase!: ()=> void;

  //creamos una promesa que se resuelve cuando firebase se haya cargado(para que no vuelva a mostrar la venta de login una vez iniciando la sesion)
  //aca promesa vacia esperando que se carge la siguiente linea
  firebaseCargando = new Promise<void>((resolve)=>{
    //aca se cumple la promesa cargando la base de datos
    this.cargarFirebase = resolve;
  });

  //aca se usa para revisar el status de la base de datos para verificar si hay usuario logeado
  constructor(){
    
    FirebaseAuthentication.getCurrentUser();
    FirebaseAuthentication.addListener('authStateChange',(status)=>{
      this.user = this.user;
      this.cargarFirebase();
    });
  }



  
//EN USO
  async login(email:string, password: string ){
    const resultadoLogin = await FirebaseAuthentication.signInWithEmailAndPassword({
      email,
      password
    });
  }

  //EN USO
  async cerrarSession(){
    await FirebaseAuthentication.signOut();
  }

  estadoUsertest(): Observable<any>{
    return from(FirebaseAuthentication.getCurrentUser());
  }

  //activo (no tengo muy claro si es necesario)
  async estadoUser2(){
    const user = await FirebaseAuthentication.getCurrentUser();
    if(user){
      const uid = user.user?.uid;
      console.log("Uid estadoUser2 hola", uid);
      return uid;
    }else{
      console.log("no hay weon");
      return null;
    }
  }

  //activo EN USO
  async getUid2(){
    const user = await FirebaseAuthentication.getCurrentUser();
    return user.user?.uid;
  }

  //test recargar 
  async getUid22(): Promise<string | null>{
    const user = await FirebaseAuthentication.getCurrentUser();
    return user.user?.uid || null;
  }


 //activo (component)
 async estado(){
  const user = await FirebaseAuthentication.getCurrentUser();
  if(user && user.user?.uid){
    this.userSubject.next(true);
    console.log("componente logeado");
  }else{
    this.userSubject.next(false);
    console.log("componente no logeado");
  }
 }
 //activo(component)
 getUserState(){
  return this.userSubject.asObservable();
 }
 //activo(component)
 refreshUserState(){
  this.estado();
 }

 
}
