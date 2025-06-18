import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Viaje } from '../_models/viajes';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  
  
  
  firestoree = inject(AngularFirestore) ;
  private collectionName = 'Viajes';
  
  
  constructor() { }



  //obtener viajes y agregar el id a cada uno
  getViajes(): Observable<Viaje[]>{
    return this.firestoree.collection<Viaje>('Viajes').valueChanges({ idField: 'id'});
  }



  //mostrar solo los true
  mostrarSolicitados(): Observable<Viaje[]>{
    return this.firestoree.collection<Viaje>('Viajes', ref => ref.where('estado','==',true)).valueChanges({ idField: 'id'});
  }

  createDoc(data:any, path:string, id:any){
    const collection = this.firestoree.collection(path);
    return collection.doc(id).set(data);
  }

  getId(){
    return this.firestoree.createId();
  }
  

  getCollection<tipo>(path:string){
    const collection = this.firestoree.collection<tipo>(path);
    return collection.valueChanges();
  }

  getDoc<tipo>(path: string, id:any){
    return this.firestoree.collection(path).doc<tipo>(id).valueChanges()
  }

  updateDoc(path:string, id:string, data:any){
    return this.firestoree.collection(path).doc(id).update(data);

  }

  //test tipo usuario por pantalla
  getUserProfileType(uid: any): Observable<string | null>{
    return this.firestoree.collection('Usuarios').doc(uid).get().pipe(
      map(docSnapshot => {
        if(docSnapshot.exists){
          const userData = docSnapshot.data() as any;
          console.log('usuario es ',userData.perfil);
          return userData.perfil || null;
        }else{
          console.warn ('documento no encontrado');
          return null;
        }
      })
    )
  }

 


}
