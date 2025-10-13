import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleStrategy, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class TranslateTitleStrategy extends TitleStrategy {
  private baseTitle = 'Evoluciona';

  constructor(private title: Title, private translate: TranslateService) {
    super();
  }

  private findDeepestTitle(snapshot: RouterStateSnapshot): string | undefined {
    let node = snapshot.root;
    while (node.firstChild) {
      node = node.firstChild;
    }
    return node.data && (node.data['title'] || node.data?.['title']);
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    let dataTitle = this.buildTitle(snapshot) as string | undefined;
    if (!dataTitle) {
      dataTitle = this.findDeepestTitle(snapshot);
    }

    if (!dataTitle) {
      this.title.setTitle(this.baseTitle);
      return;
    }

    const key = dataTitle;

    // intento inmediato
    this.translate.get(key).pipe(take(1)).subscribe(translated => {
      if (translated && translated !== key) {
        this.title.setTitle(`${this.baseTitle} | ${translated}`);
        return;
      }

      // si aún no hay traducción, esperar a que cambie el idioma o se carguen traducciones
      const trigger$ = merge(this.translate.onLangChange, this.translate.onTranslationChange);
      trigger$.pipe(take(1)).subscribe(() => {
        this.translate.get(key).pipe(take(1)).subscribe(t2 => {
          const final = t2 && t2 !== key ? t2 : key;
          this.title.setTitle(`${this.baseTitle} | ${final}`);
        });
      });
    });
  }
}