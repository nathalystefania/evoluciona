import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18nServiceService {

  localeEvent = new Subject<string>();

  constructor(private translate: TranslateService, private http: HttpClient) { }

  async changeLocale(locale: string) {
    
    this.translate.use(locale);
    this.localeEvent.next(locale);

    localStorage.setItem('currentLang', locale);
    
    if(this.translate.currentLang){
      this.translate.setDefaultLang(this.translate.currentLang);
    } 

    try {
      const routes = await firstValueFrom(this.http.get(`/assets/i18n/routes-${locale}.json`));
      this.translate.setTranslation(locale, routes as any, true);
    } catch (e) { /* ignore */ }
  }
}