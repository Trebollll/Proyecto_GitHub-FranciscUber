import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { logeadoGuard, perfilPasajero, perfilConductor, visitaGuard } from './utils/guards2';
const routes: Routes = [
  {
    path: 'home',
    canActivate: [logeadoGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'viaje',
    canActivate: [perfilConductor],
    loadChildren: () => import('./viaje/viaje.module').then( m => m.ViajePageModule)
  },
  {
    path: 'loginconductor',
    loadChildren: () => import('./viajesConductor/loginconductor.module').then( m => m.LoginconductorPageModule)
  },
  {
    path: 'loginpasajero',
    canActivate: [visitaGuard],
    loadChildren: () => import('./loginpasajero/loginpasajero.module').then( m => m.LoginpasajeroPageModule)
  },
  {
    path: 'registro',
    canActivate: [visitaGuard],
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'conductor',
    canActivate: [perfilConductor],
    loadChildren: () => import('./conductor/conductor.module').then( m => m.ConductorPageModule)
  },
  {
    path: 'pasajero',
    canActivate: [perfilPasajero],
    loadChildren: () => import('./pasajero/pasajero.module').then( m => m.PasajeroPageModule)
  },
  {
    path: 'mostrar-viajes',
    canActivate: [perfilPasajero],
    loadChildren: () => import('./mostrar-viajes/mostrar-viajes.module').then( m => m.MostrarViajesPageModule)
  },
  {
    path: 'restablecer',
    canActivate: [visitaGuard],
    loadChildren: () => import('./restablecer/restablecer.module').then( m => m.RestablecerPageModule)
  },
  {
    path: 'perfil',
    canActivate: [logeadoGuard],
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'solicitar-viajes',
    canActivate: [perfilPasajero],
    loadChildren: () => import('./solicitar-viajes/solicitar-viajes.module').then( m => m.SolicitarViajesPageModule)
  },
  {
    path: 'solicitudes-viajes',
    canActivate: [perfilConductor],
    loadChildren: () => import('./solicitudes-viajes/solicitudes-viajes.module').then( m => m.SolicitudesViajesPageModule)
  },
  {
    path: 'conductor-viajes',
    canActivate: [perfilConductor],
    loadChildren: () => import('./conductor-viajes/conductor-viajes.module').then( m => m.ConductorViajesPageModule)
  },
  {
    path: 'encurso',
    canActivate: [logeadoGuard],
    loadChildren: () => import('./encurso/encurso.module').then( m => m.EncursoPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./mapa/mapa.module').then( m => m.MapaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
