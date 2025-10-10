import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import { OurProductsComponent } from './our-products/our-products.component';
import { TrafficMonitoringFrontEndComponent } from './traffic-monitoring-front-end/traffic-monitoring-front-end.component';
import { PoliceControllerAdapterComponent } from './police-controller-adapter/police-controller-adapter.component';

const routes: Routes = [
  {
    path: '',
    component: ProductPageComponent,
    children: [
      {
        path: 'our-products',
        component: OurProductsComponent,
        data: { title: 'PRODUCTS.TITLE' }
      },
      {
        path: 'traffic-monitoring-front-end',
        component: TrafficMonitoringFrontEndComponent,
        data: { title: 'PRODUCTS.TITLE' }
      },
      {
        path: 'police-controller-adapter',
        component: PoliceControllerAdapterComponent,
        data: { title: 'PRODUCTS.PCA.TITLE' }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
