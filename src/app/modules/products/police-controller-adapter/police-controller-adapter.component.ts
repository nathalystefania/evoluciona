import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nServiceService } from 'src/app/i18n-service/i18n-service.service';


import { VgApiService } from '@videogular/ngx-videogular/core';
import { PlayerStateService } from '@shared/services/player-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-police-controller-adapter',
  templateUrl: './police-controller-adapter.component.html',
  styleUrls: ['./police-controller-adapter.component.sass']
})
export class PoliceControllerAdapterComponent implements OnInit {
  nCards = 'grid-cols-1 md:grid-cols-3'
  gridCols = 'grid-cols-1 md:grid-cols-1'
  spanCol1 = 'md:col-span-2'
  spanCol2 = 'md:col-span-4'
  startCol2 = 'md:col-start-3'

  videoStates: { [key: string]: { playing: boolean, paused: boolean } } = {};
  videoPlay: Record<string, boolean> = {};
  videoPause: Record<string, boolean> = {};
  api!: VgApiService;
  playerState$!: Observable<string>;
  
  @Input() dataCards: Array<any> = []
  @Input() dataCards2: Array<any> = []
  @Input() dataLargeCards: Array<any> = []

  constructor(
    public translate: TranslateService, 
    private i18nService: I18nServiceService,
    private playerState: PlayerStateService
    ) {
      let lang = localStorage.getItem('currentLang') || 'en';
      translate.setDefaultLang(lang);
      translate.use(lang);
  }

  ngOnInit(): void {
    this.i18nService.localeEvent.subscribe(locale => this.translate.use(locale)); 
    this.playerState$ = this.playerState.state$;

    this.dataCards = [
      {
        title: 'OUR_SPECIALIZATION_IN_ITS.CARDS.CARD1.TITLE',
        image: './assets/images/icons/tmfeAutopistaIcons.svg',
        paragraph: 'OUR_SPECIALIZATION_IN_ITS.CARDS.CARD1.TEXT'
      },
      {
        title: 'OUR_SPECIALIZATION_IN_ITS.CARDS.CARD2.TITLE',
        image: './assets/images/icons/its/sistemas-centrales-peaje.svg',
        paragraph: 'OUR_SPECIALIZATION_IN_ITS.CARDS.CARD2.TEXT'
      },
      {
        title: 'OUR_SPECIALIZATION_IN_ITS.CARDS.CARD3.TITLE',
        image: './assets/images/icons/its/control-operativo.svg',
        paragraph: 'OUR_SPECIALIZATION_IN_ITS.CARDS.CARD3.TEXT'
      },
      {
        title: 'OUR_SPECIALIZATION_IN_ITS.CARDS.CARD4.TITLE',
        image: './assets/images/icons/tmfeAdviceIcon.svg',
        paragraph: 'OUR_SPECIALIZATION_IN_ITS.CARDS.CARD4.TEXT'
      }
    ],
    this.dataCards2 = [
      {
        title: 'OUR_SPECIALIZATION_IN_ITS_2.CARDS.CARD1.TEXT',
        image: './assets/images/icons/its/desarrollo-software.svg',
      },
      {
        title: 'OUR_SPECIALIZATION_IN_ITS_2.CARDS.CARD2.TEXT',
        image: './assets/images/icons/its/asesoria-concesionarias.svg',
      },
      {
        title: 'OUR_SPECIALIZATION_IN_ITS_2.CARDS.CARD3.TEXT',
        image: './assets/images/icons/its/asesoria-gobierno.svg',
      }
    ],
    this.dataLargeCards = [
      {
        title: 'ITS_SOFTWARE_DEVELOPED.CARDS.CARD1.TITLE',
        text: 'ITS_SOFTWARE_DEVELOPED.CARDS.CARD1.TEXT',
        image: './assets/images/its/tmfe.jpg',
        id_en: 'itsTmfeEn',
        id_es: 'itsTmfeEs',
        video_mp4_en: './assets/video/tmfe/TMFE_en.mp4',
        video_ogv_en: './assets/video/tmfe/TMFE_en.ogv',
        video_webm_en: './assets/video/tmfe/TMFE_en.webm',
        video_mp4_es: './assets/video/tmfe/TMFE_es.mp4',
        video_ogv_es: './assets/video/tmfe/TMFE_es.ogv',
        video_webm_es: './assets/video/tmfe/TMFE_es.webm',
        subtitle_en: './assets/video/tmfe/subtitles/tmfe_es_sub_en.vtt',
        subtitle_es: './assets/video/tmfe/subtitles/tmfe_es_sub_es.vtt'
      },
      {
        title: 'ITS_SOFTWARE_DEVELOPED.CARDS.CARD2.TITLE',
        text: 'ITS_SOFTWARE_DEVELOPED.CARDS.CARD2.TEXT',
        image: './assets/images/its/OBO.jpg',
        id_en: 'itsOboEn',
        id_es: 'itsOboEs',
        video_mp4_en: './assets/video/obo/obo_en.mp4',
        video_ogv_en: './assets/video/obo/obo_en.ogv',
        video_webm_en: './assets/video/obo/obo_en.webm',
        video_mp4_es: './assets/video/obo/obo_es.mp4',
        video_ogv_es: './assets/video/obo/obo_es.ogv',
        video_webm_es: './assets/video/obo/obo_es.webm',
        subtitle_en: './assets/video/obo/subtitles/obo_es_sub_en.vtt',
        subtitle_es: './assets/video/obo/subtitles/obo_es_sub_es.vtt'
      },
      {
        title: 'ITS_SOFTWARE_DEVELOPED.CARDS.CARD3.TITLE',
        text: 'ITS_SOFTWARE_DEVELOPED.CARDS.CARD3.TEXT',
        image: './assets/images/its/comercial-back-office.jpg',
        id_en: 'itsCboEn',
        id_es: 'itsCboEs',
        video_mp4_en: './assets/video/Cbo/cbo_en.mp4',
        video_ogv_en: './assets/video/Cbo/cbo_en.ogv',
        video_webm_en: './assets/video/Cbo/cbo_en.webm',
        video_mp4_es: './assets/video/Cbo/cbo_es.mp4',
        video_ogv_es: './assets/video/Cbo/cbo_es.ogv',
        video_webm_es: './assets/video/Cbo/cbo_es.webm',
        subtitle_en: './assets/video/Cbo/subtitles/cbo_es_sub_en.vtt',
        subtitle_es: './assets/video/Cbo/subtitles/cbo_es_sub_es.vtt'
      },
    ]
  }

  onPlayerReady(api: VgApiService, videoId: string) {
    this.videoStates[videoId] = { playing: false, paused: false };

    api.getDefaultMedia().subscriptions.play.subscribe(
      (event) => {
        this.videoStates[videoId].playing = true;
        this.videoStates[videoId].paused = false;
      }
    );

    api.getDefaultMedia().subscriptions.pause.subscribe(
      (event) => {
        this.videoStates[videoId].playing = false;
        this.videoStates[videoId].paused = true;
      }
    );
  }

  toggleVideo(videoId: string) {
    this.videoPlay[videoId] = !this.videoPlay[videoId];
    this.videoPause[videoId] = !this.videoPause[videoId];
  }

  isVideoPlaying(videoId: string): boolean {
    return this.videoStates[videoId] && this.videoStates[videoId].playing;
  }

  isVideoPaused(videoId: string): boolean {
    return this.videoStates[videoId] && this.videoStates[videoId].paused;
  }

  isVideoCoverVisible(videoId: string): boolean {
    return !this.isVideoPlaying(videoId) && !this.isVideoPaused(videoId);
  }


}
