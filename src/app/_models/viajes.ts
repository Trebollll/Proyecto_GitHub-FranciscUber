export interface Viaje {
    id: string;
    fecha: string;
    patente: string;
    vehiculo: string;
    origen: string;
    destino: string;
    pasajeros: string;
    gama:string;
    precio: string;
    img: string;
    usuarioId: string;
    estado: string | null;
    idPasajero: string;

}

export interface UserI{
    nombre: any;
    correo: any;
    edad: any;
    uid: any;
    password: any;
    password2: any;
    perfil: any;
}

