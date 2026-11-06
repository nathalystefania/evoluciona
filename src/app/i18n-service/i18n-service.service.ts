import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18nServiceService {

  localeEvent = new Subject<string>();

  constructor(
    private translate: TranslateService,
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {
    // Sincroniza el atributo lang al iniciar con el idioma guardado
    this.setHtmlLang(localStorage.getItem('currentLang') || 'en');
  }

  private setHtmlLang(locale: string): void {
    this.document.documentElement.lang = locale;
  }

  async changeLocale(locale: string) {
    
    this.translate.use(locale);
    this.localeEvent.next(locale);
    this.setHtmlLang(locale);

    localStorage.setItem('currentLang', locale);
    
    if(this.translate.currentLang){
      this.translate.setDefaultLang(this.translate.currentLang);
    } 

    try {
      const routes = await firstValueFrom(this.http.get(`assets/i18n/routes-${locale}.json`));
      this.translate.setTranslation(locale, routes as any, true);
    } catch (e) { /* ignore */ }
  }
}