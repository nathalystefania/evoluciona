
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { I18nServiceService } from './i18n-service/i18n-service.service';
import { AnalyticsService } from '@shared/services/analytics.service';
import { SeoService } from '@shared/services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private titleService: Title,
    private i18nService: I18nServiceService,
    private analytics: AnalyticsService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    // Navegación: metadata + Analytics
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd =>
          event instanceof NavigationEnd
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.updateSeo();

        this.analytics.sendPageView(this.router.url, {
          page_title: this.titleService.getTitle()
        });
      });

    // El servicio emite después de cargar y combinar las traducciones de rutas.
    this.i18nService.localeEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateSeo());

    // Cubre el caso de navegación inicial ya completada.
    if (this.router.navigated) {
      this.updateSeo();
    }
  }

  private updateSeo(): void {
    this.seo.update(this.router.routerState.snapshot);
  }

  changeLocale(locale: string): void {
    void this.i18nService.changeLocale(locale).catch(error => {
      console.error(`No se pudo cambiar el idioma a "${locale}".`, error);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
