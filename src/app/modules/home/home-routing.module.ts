import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`@modules/init/init.module`).then(m => m.InitModule),
    data:
      { 
        title: 'HOME.title',
        seoTitle: 'HOME.seoTitle',
        seoDescription: 'HOME.seoDescription'
      }
  },
  {
    path: 'pca',
    loadChildren: () =>
      import('@modules/products/police-controller-adapter/police-controller-adapter.module').then(m => m.PoliceControllerAdapterModule)
  },
  {
    path: 'products',
    loadChildren: () => import(`@modules/products/products.module`).then(m => m.ProductsModule),
    data:
      { 
        title: 'PRODUCTS.title',
        seoTitle: 'PRODUCTS.seoTitle',
        seoDescription: 'PRODUCTS.seoDescription'
      }
  },
  {
    path: 'its-transportation-systems',
    loadChildren: () => import(`@modules/services/services.module`).then(m => m.ServicesModule),
    data:
      { 
        title: 'ITS.title',
        seoTitle: 'ITS.seoTitle',
        seoDescription: 'ITS.seoDescription'
      }
  },
  {
    path: 'clients',
    loadChildren: () => import(`@modules/clients/clients.module`).then(m => m.ClientsModule),
    data:
      { 
        title: 'CLIENTS_&_SUCCESS_STORIES.title',
        seoTitle: 'CLIENTS_&_SUCCESS_STORIES.seoTitle',
        seoDescription: 'CLIENTS_&_SUCCESS_STORIES.seoDescription'
      }
  },
  {
    path: 'development-innovation',
    loadChildren: () => import(`@modules/development-innovation/development-innovation.module`).then(m => m.DevelopmentInnovationModule),
    data:
      { 
        title: 'DEVELOPMENT_&_INNOVATION.title',
        seoTitle: 'DEVELOPMENT_&_INNOVATION.seoTitle',
        seoDescription: 'DEVELOPMENT_&_INNOVATION.seoDescription'
      }
  },
  {
    path: 'staﬃng-global',
    loadChildren: () => import(`@modules/sourcing-global/sourcing-global.module`).then(m => m.SourcingGlobalModule),
    data:
      { 
        title: 'GLOBAL_SOURCING.title',
        seoTitle: 'GLOBAL_SOURCING.seoTitle',
        seoDescription: 'GLOBAL_SOURCING.seoDescription'
      }
  },
  // {
  //   path: 'news',
  //   loadChildren: () => import(`@modules/news/news.module`).then(m => m.NewsModule),
  // },
  {
    path: 'contact',
    loadChildren: () => import(`@modules/contact/contact.module`).then(m => m.ContactModule),
    data:
      { 
        title: 'CONTACT.title',
        seoTitle: 'CONTACT.seoTitle',
        seoDescription: 'CONTACT.seoDescription'
      }
  },
  {
    path: 'mesu2025',
    loadChildren: () => import(`@modules/mesu2025/mesu2025.module`).then(m => m.Mesu2025Module),
    data:
      { 
        title: 'MESU2025.title',
        seoTitle: 'MESU2025.seoTitle',
        seoDescription: 'MESU2025.seoDescription'
      }
  },
  {
    path: 'transformation-and-operational-excellence',
    loadChildren: () => import(`@modules/transformation-operational-excellence/transformation-operational-excellence.module`).then(m => m.TransformationOperationalExcellenceModule),
    data:
      { 
        title: 'TRANSFORMATION_OPERATIONAL_EXCELLENCE.title',
        seoTitle: 'TRANSFORMATION_OPERATIONAL_EXCELLENCE.seoTitle',
        seoDescription: 'TRANSFORMATION_OPERATIONAL_EXCELLENCE.seoDescription'
      }
  },
  {
    path: 'experience-and-performance-intelligence',
    loadChildren: () => import(`@modules/experience-and-performance-intelligence/experience-and-performance-intelligence.module`).then(m => m.ExperienceAndPerformanceIntelligenceModule),
    data:
      { 
        title: 'EXPERIENCE_AND_PERFORMANCE_INTELLIGENCE.title',
        seoTitle: 'EXPERIENCE_AND_PERFORMANCE_INTELLIGENCE.seoTitle',
        seoDescription: 'EXPERIENCE_AND_PERFORMANCE_INTELLIGENCE.seoDescription'
      }
  },
  {
    path: 'sourcing-global',
    redirectTo: 'staﬃng-global',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
