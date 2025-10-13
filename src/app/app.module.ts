import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AutorizationInterceptorService } from './core/interceptors/autorization.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ScrollAnchorDirective } from './directives/scroll-anchor.directive';
import { ScrollSectionDirective } from './directives/scroll-section.directive';
import { ScrollManagerDirective } from './directives/scroll-manager.directive';
import { PlayerStateService } from '@shared/services/player-state.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { MaterialModule } from '@shared/material.module';

import { Title } from '@angular/platform-browser';
import { TranslateTitleStrategy } from './core/translate-title.strategy';
import { APP_INITIALIZER } from '@angular/core';
import { firstValueFrom, forkJoin, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TitleStrategy } from '@angular/router';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// reemplaza HttpLoaderFactory si ya está definido (se puede mantener)
// nueva fábrica que carga base + routes y setea/mergea las traducciones
export function loadTranslationsFactory(translate: TranslateService, http: HttpClient) {
  return async () => {
    const lang = localStorage.getItem('currentLang') || 'en';
    const baseUrl = `/assets/i18n/${lang}.json`;
    const routesUrl = `/assets/i18n/routes-${lang}.json`;

    try {
      // intenta cargar ambos en paralelo; si alguno falla, se captura
      const [base, routes] = await firstValueFrom(
        forkJoin([ http.get(baseUrl), http.get(routesUrl) ])
      );
      translate.setTranslation(lang, base as any, true);
      translate.setTranslation(lang, routes as any, true);
    } catch (e) {
      // fallback: intenta cargar individualmente y mergear lo que exista
      try { const base = await firstValueFrom(http.get(baseUrl)); translate.setTranslation(lang, base as any, true); } catch {}
      try { const routes = await firstValueFrom(http.get(routesUrl)); translate.setTranslation(lang, routes as any, true); } catch {}
    }

    // activa el idioma y espera a que termine la carga del loader
    await translate.use(lang).toPromise();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ScrollAnchorDirective,
    ScrollSectionDirective,
    ScrollManagerDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),    
    MaterialModule
  ],
  providers: [
    PlayerStateService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AutorizationInterceptorService,
    //   multi: true
    // },
    Title,
    { provide: TitleStrategy, useClass: TranslateTitleStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: loadTranslationsFactory,
      deps: [TranslateService, HttpClient],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
