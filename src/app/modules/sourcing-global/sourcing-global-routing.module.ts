import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SourcingGlobalPageComponent } from './pages/sourcing-global-page/sourcing-global-page.component';

const routes: Routes = [
  {
    path: '',
    component: SourcingGlobalPageComponent,
    data: { title: 'GLOBAL_SOURCING.TITLE' }
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourcingGlobalRoutingModule { }
