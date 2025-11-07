import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Mesu2025RoutingModule } from './mesu2025-routing.module';
import { Mesu2025Component } from './mesu2025.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '@shared/shared.module';
import { MatIconModule } from "@angular/material/icon";

export function mesuHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/mesu2025/', '.json');
}

@NgModule({
  declarations: [
    Mesu2025Component
  ],
  imports: [
    CommonModule,
    Mesu2025RoutingModule,
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: mesuHttpLoaderFactory,
            deps: [HttpClient]
        },
        isolate: true
    }),
    SharedModule,
    MatIconModule
]
})
export class Mesu2025Module { }
