import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject, of } from 'rxjs';
import { filter, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { I18nServiceService } from './i18n-service/i18n-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private baseTitle = 'Evoluciona';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translate: TranslateService,
    private i18nService: I18nServiceService
  ) {
    let lang = localStorage.getItem('currentLang') || 'en';
    translate.setDefaultLang(lang);
    translate.use(lang);
    this.changeLocale(lang);
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      mergeMap(route => route.data),
      switchMap(data => {
        const titleKey = data?.['title'];
        return titleKey ? this.translate.get(titleKey) : of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe(translatedTitle => {
      if (translatedTitle) {
        this.titleService.setTitle(`${this.baseTitle} | ${translatedTitle}`);
      } else {
        this.titleService.setTitle(this.baseTitle);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeLocale(locale: string) {
    this.i18nService.changeLocale(locale);   
  }
}
