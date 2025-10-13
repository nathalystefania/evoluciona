import { NgModule } from '@angular/core';
import { NgFor, NgIf, NgForOf, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IconModule } from './icon.module';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { WrapHeroComponent } from './components/wrap-hero/wrap-hero.component';
import { DescriptionComponent } from './components/description/description.component';
import { WrapDescriptionComponent } from './components/wrap-description/wrap-description.component';
import { WrapCardsComponent } from './components/wrap-cards/wrap-cards.component';
import { CardComponent } from './components/card/card.component';
import { CallToActionComponent } from './components/call-to-action/call-to-action.component';
import { SocialMediaComponent } from './components/social-media/social-media.component';
import { LargeCardComponent } from './components/large-card/large-card.component';
import { WrapLargeCardComponent } from './components/wrap-large-card/wrap-large-card.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    WrapHeroComponent,
    DescriptionComponent,
    WrapDescriptionComponent,
    WrapCardsComponent,
    CardComponent,
    CallToActionComponent,
    SocialMediaComponent,
    LargeCardComponent,
    WrapLargeCardComponent
  ],
  imports: [
    RouterModule,
    MaterialModule,
    IconModule,
    NgFor, NgIf, NgForOf,
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true,
      extend: true
    }),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    WrapHeroComponent,
    HeroComponent,
    DescriptionComponent,
    WrapDescriptionComponent,
    WrapCardsComponent,
    CardComponent,
    CallToActionComponent,
    SocialMediaComponent,
    LargeCardComponent,
    WrapLargeCardComponent
  ]
})
export class SharedModule { }
