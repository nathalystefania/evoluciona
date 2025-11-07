import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Mesu2025Component } from './mesu2025.component';

const routes: Routes = [
  {
    path: '',
    component: Mesu2025Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Mesu2025RoutingModule { }
