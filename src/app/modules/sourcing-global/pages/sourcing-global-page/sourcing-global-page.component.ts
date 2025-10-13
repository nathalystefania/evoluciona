import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nServiceService } from 'src/app/i18n-service/i18n-service.service';

import { VgApiService } from '@videogular/ngx-videogular/core';
import { PlayerStateService } from '@shared/services/player-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sourcing-global-page',
  templateUrl: './sourcing-global-page.component.html',
  styleUrls: ['./sourcing-global-page.component.sass']
})
export class SourcingGlobalPageComponent implements OnInit, OnDestroy {

  nCards = 'grid-cols-1 md:grid-cols-3'
  gridCols = 'grid-cols-1 md:grid-cols-6'
  spanCol1 = 'md:col-span-2'
  spanCol2 = 'md:col-span-4'
  startCol2 = 'md:col-start-3'

  intervalId: any;
  
  videoPlay: boolean = false
  videoPause: boolean = false 
  api!: VgApiService;
  playerState$!: Observable<string>;

  @Input() globalSourcingCards: Array<any> = []
  @Input() additionallyCards: Array<any> = []
  @Input() landingVideos: Array<any> = []

  constructor(
    public translate: TranslateService, 
    private i18nService: I18nServiceService,
    private playerState: PlayerStateService,
  ) {
    
      let lang = localStorage.getItem('currentLang') || 'en';
      translate.setDefaultLang(lang);
      translate.use(lang);
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.play.subscribe(
      (event) => {
        this.playerState.updatePlayerState('play');
        this.videoPlay = true
        this.videoPause = false
      }
    );
    this.api.getDefaultMedia().subscriptions.pause.subscribe(
        (event) => {
          this.playerState.updatePlayerState('pause');
          this.videoPause = true
          this.videoPlay = false
        }
    );
  }

  ngOnInit(): void {
    this.i18nService.localeEvent.subscribe(locale => this.translate.use(locale)); 
    this.playerState$ = this.playerState.state$;

    this.globalSourcingCards = [
      {
        title: 'WHY_DO_GLOBAL_SOURCING_WITH_US.CARDS.CARD1.TITLE',
        image: './assets/images/icons/global-sourcing/informe-psicolaboral.svg',
        paragraph: 'WHY_DO_GLOBAL_SOURCING_WITH_US.CARDS.CARD1.TEXT'
      },
      {
        title: 'WHY_DO_GLOBAL_SOURCING_WITH_US.CARDS.CARD2.TITLE',
        image: './assets/images/icons/global-sourcing/competencias-tecnicas.svg',
        paragraph: 'WHY_DO_GLOBAL_SOURCING_WITH_US.CARDS.CARD2.TEXT'
      },
      {
        title: 'WHY_DO_GLOBAL_SOURCING_WITH_US.CARDS.CARD3.TITLE',
        image: './assets/images/icons/global-sourcing/apoyo-tecnico.svg',
        paragraph: 'WHY_DO_GLOBAL_SOURCING_WITH_US.CARDS.CARD3.TEXT'
      },
      {
        title: 'WHY_DO_GLOBAL_SOURCING_WITH_US.CARDS.CARD4.TITLE',
        image: './assets/images/icons/global-sourcing/apegados-legislacion.svg',
        paragraph: 'WHY_DO_GLOBAL_SOURCING_WITH_US.CARDS.CARD4.TEXT'
      },
      {
        title: 'WHY_DO_GLOBAL_SOURCING_WITH_US.CARDS.CARD5.TITLE',
        image: './assets/images/icons/global-sourcing/monitoreo_permanente.svg',
        paragraph: 'WHY_DO_GLOBAL_SOURCING_WITH_US.CARDS.CARD5.TEXT'
      },
      {
        title: 'WHY_DO_GLOBAL_SOURCING_WITH_US.CARDS.CARD6.TITLE',
        image: './assets/images/icons/global-sourcing/absorcion-laboral.svg',
        paragraph: 'WHY_DO_GLOBAL_SOURCING_WITH_US.CARDS.CARD6.TEXT'
      },
      {
        title: 'WHY_DO_GLOBAL_SOURCING_WITH_US.CARDS.CARD7.TITLE',
        image: './assets/images/icons/global-sourcing/global-sourcing.svg',
        paragraph: 'WHY_DO_GLOBAL_SOURCING_WITH_US.CARDS.CARD7.TEXT'
      },
    ]

    this.additionallyCards = [
      {
        title: 'ADDITIONALLY.CARDS.CARD1.TITLE',
        image: './assets/images/global-sourcing/seleccion.jpg',
        paragraph: 'ADDITIONALLY.CARDS.CARD1.TEXT'
      },
      {
        title: 'ADDITIONALLY.CARDS.CARD2.TITLE',
        image: './assets/images/global-sourcing/ahorro.jpg',
        paragraph: 'ADDITIONALLY.CARDS.CARD2.TEXT'
      },
      {
        title: 'ADDITIONALLY.CARDS.CARD3.TITLE',
        image: './assets/images/global-sourcing/profesionalismo.jpg',
        paragraph: 'ADDITIONALLY.CARDS.CARD3.TEXT'
      },
    ]

    this.landingVideos = [
      {
        id: 'globalSourcingEs',
        lang: 'es',
        videoMp4: './assets/video/global/global-sourcing_es.mp4',
        videoOgv: './assets/video/global/global-sourcing_es.ogv',
        videoWebm: './assets/video/global/global-sourcing_es.webm',
        subtitlesEn: './assets/video/global/subtitles/global-sourcing_es_sub_ingles.vtt',
        subtitlesEs: './assets/video/global/subtitles/global-sourcing_es_sub_espanol.vtt',
        cover: './assets/images/home-video-cover.png',
      },
      {
        id: 'globalSourcingEn',
        lang: 'en',
        videoMp4: './assets/video/global/global-sourcing_en.mp4',
        videoOgv: './assets/video/global/global-sourcing_en.ogv',
        videoWebm: './assets/video/global/global-sourcing_en.webm',
        subtitlesEn: './assets/video/global/subtitles/global-sourcing_es_sub_ingles.vtt',
        subtitlesEs: './assets/video/global/subtitles/global-sourcing_es_sub_espanol.vtt',
        cover: './assets/images/home-video-cover.png',
      }
    ]
  }
  
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
