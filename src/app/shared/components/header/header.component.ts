import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nServiceService } from 'src/app/i18n-service/i18n-service.service';

declare const M: any;
import 'materialize-css/dist/js/materialize.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  ngAfterViewInit(): void {
    const selects = document.querySelectorAll('.material_select');
    M.FormSelect.init(selects);

  }
  
  lang = 'en';

  constructor(
    private translate: TranslateService, 
    private i18nService: I18nServiceService
    ) {
      this.lang = localStorage.getItem('currentLang') || 'en';
      translate.setDefaultLang(this.lang);
      translate.use(this.lang);
  }

  changeLocale(locale: string) {
    this.i18nService.changeLocale(locale);   
  }

  
  ngOnInit(): void {
    this.i18nService.localeEvent.subscribe(locale => this.translate.use(locale));
  }

}