import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { I18nServiceService } from 'src/app/i18n-service/i18n-service.service';

@Component({
  selector: 'app-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.sass']
})
export class CallToActionComponent {
  @Input() text?: string;
  @Input() icon?: string;
  @Input() svgIcon?: string; 
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() action?: (event?: Event) => void;

  constructor(
    private router: Router,
    private translate: TranslateService, 
    private i18nService: I18nServiceService
  ) {
      let lang = localStorage.getItem('currentLang') || 'en';
      translate.setDefaultLang(lang);
      translate.use(lang);

   }

  ngOnInit(): void {    
    this.i18nService.localeEvent.subscribe(locale => this.translate.use(locale)); 
  }

  onClick(event: Event) {
    if (this.action) {
      try { this.action(event); } catch (e) { /* opcional: manejar error */ }
    }
  }
}

