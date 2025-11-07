import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Interface } from 'readline';
import { I18nServiceService } from 'src/app/i18n-service/i18n-service.service';

interface Section {
  title: string;
  content: string;
  button?: string;
  document?: string;
  tel?: string;
  email?: string;
}

@Component({
  selector: 'app-mesu2025',
  templateUrl: './mesu2025.component.html',
  styleUrls: ['./mesu2025.component.sass']
})
export class Mesu2025Component implements OnInit {

  gridCols = 'grid-cols-1';

  sections = [
    { 
      title: 'TERMS.CONFIDENTIALITY.TITLE',
      content: 'TERMS.CONFIDENTIALITY.CONTENT',
      button: 'TERMS.CONFIDENTIALITY.BUTTON',
      document: 'assets/downloads/Documento_Confidencialidad_MESU2025_Evoluciona.pdf',
    },
    { 
      title: 'TERMS.BASES.TITLE',
      content: 'TERMS.BASES.CONTENT',
      button: 'TERMS.BASES.BUTTON',
      document: 'assets/downloads/Bases_Sorteo_MESU2025_Evoluciona.pdf',
    },
    { 
      title: 'TERMS.CONTACT.TITLE',
      content: 'TERMS.CONTACT.CONTENT',
      email: "mesu2025@evoluciona.cl",
      tel: "+56 2 3220 7200"
    },
  ];

  constructor(
    public translate: TranslateService, 
    private i18nService: I18nServiceService,
  ) {
    let lang = localStorage.getItem('currentLang') || 'en';
    translate.setDefaultLang(lang);
    translate.use(lang);
  }

  ngOnInit(): void {
    this.i18nService.localeEvent.subscribe(locale => this.translate.use(locale)); 
  }

}
