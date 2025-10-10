import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleStrategy, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TranslateTitleStrategy extends TitleStrategy {
  private baseTitle = 'Evoluciona';

  constructor(private title: Title, private translate: TranslateService) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const dataTitle = this.buildTitle(snapshot);
    if (!dataTitle) {
      this.title.setTitle(this.baseTitle);
      return;
    }

    const key = dataTitle as string;
    this.translate.get(key).subscribe(translated => {
      const suffix = translated && translated !== key ? translated : key;
      this.title.setTitle(`${this.baseTitle} | ${suffix}`);
    });
  }
}