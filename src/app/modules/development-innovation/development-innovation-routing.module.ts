import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevelopmentInnovationPageComponent } from './pages/development-innovation-page/development-innovation-page.component';

const routes: Routes = [
  {
    path: '',
    component: DevelopmentInnovationPageComponent,
    data: { title: 'DEVELOPMENT_&_INNOVATION.TITLE' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevelopmentInnovationRoutingModule { }
