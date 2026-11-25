import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, Subject } from 'rxjs';

import { I18nServiceService } from './i18n-service.service';

describe('I18nServiceService', () => {
  let service: I18nServiceService;
  let http: jasmine.SpyObj<HttpClient>;
  let translate: jasmine.SpyObj<TranslateService>;
  let previousLocale: string | null;
  let previousDocumentLanguage: string;

  beforeEach(() => {
    previousLocale = localStorage.getItem('currentLang');
    previousDocumentLanguage = document.documentElement.lang;

    http = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
    translate = jasmine.createSpyObj<TranslateService>('TranslateService', [
      'use',
      'setTranslation',
      'setDefaultLang'
    ]);

    TestBed.configureTestingModule({
      providers: [
        I18nServiceService,
        { provide: HttpClient, useValue: http },
        { provide: TranslateService, useValue: translate },
        { provide: DOCUMENT, useValue: document }
      ]
    });

    service = TestBed.inject(I18nServiceService);
  });

  afterEach(() => {
    if (previousLocale === null) {
      localStorage.removeItem('currentLang');
    } else {
      localStorage.setItem('currentLang', previousLocale);
    }

    document.documentElement.lang = previousDocumentLanguage;
  });

  it('emits the locale after loading and merging route translations', async () => {
    const routes = { HOME: { seoTitle: 'Inicio' } };
    const languageLoaded = new Subject<unknown>();
    const localeListener = jasmine.createSpy('localeListener').and.callFake(() => {
      expect(translate.setTranslation).toHaveBeenCalledWith('es', routes, true);
    });

    http.get.and.returnValue(of(routes) as Observable<Object>);
    translate.use.and.returnValue(languageLoaded.asObservable());
    service.localeEvent.subscribe(localeListener);

    const change = service.changeLocale('es');
    await Promise.resolve();

    expect(translate.use).toHaveBeenCalledWith('es');
    expect(localeListener).not.toHaveBeenCalled();

    languageLoaded.next({});
    languageLoaded.complete();
    await change;

    expect(translate.setDefaultLang).toHaveBeenCalledWith('es');
    expect(localeListener).toHaveBeenCalledWith('es');
  });
});
