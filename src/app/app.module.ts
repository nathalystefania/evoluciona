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
import { firstValueFrom, forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TitleStrategy } from '@angular/router';
// import { TitleStrategy } from '@angular/router'; // Removed due to missing export in current Angular version

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// reemplaza HttpLoaderFactory si ya está definido (se puede mantener)
// nueva fábrica que carga base + routes y setea/mergea las traducciones
export function loadTranslationsFactory(translate: TranslateService, http: HttpClient) {
  return async () => {
    const lang = localStorage.getItem('currentLang') || 'en';

    // Cargar ambos JSON en paralelo; ignorar si alguno falta
    const baseUrl = `/assets/i18n/${lang}.json`;
    const routesUrl = `/assets/i18n/routes-${lang}.json`;

    try {
      const [base, routes] = await firstValueFrom(
        forkJoin([
          http.get(baseUrl).pipe(),    // may 404 -> caught by try/catch
          http.get(routesUrl).pipe()
        ])
      );

      // merge = true para no sobreescribir keys ya existentes
      translate.setTranslation(lang, base as any, true);
      translate.setTranslation(lang, routes as any, true);
    } catch (e) {
      // fallback: intentar cargar lo que exista individualmente
      try {
        const base = await firstValueFrom(http.get(baseUrl));
        translate.setTranslation(lang, base as any, true);
      } catch {}
      try {
        const routes = await firstValueFrom(http.get(routesUrl));
        translate.setTranslation(lang, routes as any, true);
      } catch {}
    }

    // finalmente activar el idioma (esto no lanzará otra solicitud si ya cargamos base)
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutorizationInterceptorService,
      multi: true
    },
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
