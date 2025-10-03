import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`@modules/init/init.module`).then(m => m.InitModule)
  },
  {
    path: 'products',
    loadChildren: () => import(`@modules/products/products.module`).then(m => m.ProductsModule)
  },
  {
    path: 'its-transportation-systems',
    loadChildren: () => import(`@modules/services/services.module`).then(m => m.ServicesModule)
  },
  {
    path: 'clients',
    loadChildren: () => import(`@modules/clients/clients.module`).then(m => m.ClientsModule)
  },
  {
    path: 'development-innovation',
    loadChildren: () => import(`@modules/development-innovation/development-innovation.module`).then(m => m.DevelopmentInnovationModule)
  },
  {
    path: 'sourcing-global',
    loadChildren: () => import(`@modules/sourcing-global/sourcing-global.module`).then(m => m.SourcingGlobalModule)
  },
  {
    path: 'news',
    loadChildren: () => import(`@modules/news/news.module`).then(m => m.NewsModule)
  },
  {
    path: 'contact',
    loadChildren: () => import(`@modules/contact/contact.module`).then(m => m.ContactModule)
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
