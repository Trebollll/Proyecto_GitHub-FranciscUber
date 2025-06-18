import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConductorViajesPage } from './conductor-viajes.page';

const routes: Routes = [
  {
    path: '',
    component: ConductorViajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConductorViajesPageRoutingModule {}
