import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';


import { ProductsRoutingModule } from './products-routing.module';
import { ProductPageComponent } from './product-page/product-page.component';
import { SharedModule } from '@shared/shared.module';
import { OurProductsComponent } from './our-products/our-products.component';
import { TrafficMonitoringFrontEndComponent } from './traffic-monitoring-front-end/traffic-monitoring-front-end.component';
import { PoliceControllerAdapterComponent } from './police-controller-adapter/police-controller-adapter.component';

export function productsHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/products/', '.json');
}

@NgModule({
  declarations: [
    ProductPageComponent,
    OurProductsComponent,
    TrafficMonitoringFrontEndComponent,
    PoliceControllerAdapterComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ProductsRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: productsHttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true,
    }),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ]
})
export class ProductsModule { }
