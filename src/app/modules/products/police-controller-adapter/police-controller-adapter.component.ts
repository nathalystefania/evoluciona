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
  features: { title: string; text: string; image: string; }[] = [];

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

    this.features = [
      {
        title: 'PCA.FEATURES.TITLE_1',
        text: 'PCA.FEATURES.TEXT_1',
        image: './assets/images/products/pca/pca.png'
      },
      {
        title: 'PCA.FEATURES.TITLE_2',
        text: 'PCA.FEATURES.TEXT_2',
        image: './assets/images/products/pca/pca_tableros_police.png'
      },
      {
        title: 'PCA.FEATURES.TITLE_3',
        text: 'PCA.FEATURES.TEXT_3',
        image: './assets/images/products/pca/pca_app.png'
      }
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

  handleCtaClick(event?: Event) {
    // lógica adicional antes/después de la navegación
    console.log('CTA clicked', event);
  }
}
