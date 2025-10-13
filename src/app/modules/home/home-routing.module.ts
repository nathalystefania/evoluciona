import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`@modules/init/init.module`).then(m => m.InitModule),
    data: { title: 'HOME.TITLE' }
  },
  {
    path: 'products',
    loadChildren: () => import(`@modules/products/products.module`).then(m => m.ProductsModule),
    data: { title: 'HOME.TITLE' }
  },
  {
    path: 'its-transportation-systems',
    loadChildren: () => import(`@modules/services/services.module`).then(m => m.ServicesModule),
    data: { title: 'HOME.TITLE' }
  },
  {
    path: 'clients',
    loadChildren: () => import(`@modules/clients/clients.module`).then(m => m.ClientsModule),
    data: { title: 'HOME.TITLE' }
  },
  {
    path: 'development-innovation',
    loadChildren: () => import(`@modules/development-innovation/development-innovation.module`).then(m => m.DevelopmentInnovationModule),
    data: { title: 'HOME.TITLE' }
  },
  {
    path: 'sourcing-global',
    loadChildren: () => import(`@modules/sourcing-global/sourcing-global.module`).then(m => m.SourcingGlobalModule),
    data: { title: 'HOME.TITLE' }
  },
  {
    path: 'news',
    loadChildren: () => import(`@modules/news/news.module`).then(m => m.NewsModule),
    data: { title: 'HOME.TITLE' }
  },
  {
    path: 'contact',
    loadChildren: () => import(`@modules/contact/contact.module`).then(m => m.ContactModule),
    data: { title: 'CONTACT.TITLE' }
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
