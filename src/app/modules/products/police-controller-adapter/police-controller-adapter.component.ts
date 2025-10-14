import { AfterViewInit, OnDestroy, ChangeDetectorRef, Component, Input, NgZone, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nServiceService } from 'src/app/i18n-service/i18n-service.service';
import { MatDialog } from '@angular/material/dialog';

import { VgApiService } from '@videogular/ngx-videogular/core';
import { PlayerStateService } from '@shared/services/player-state.service';
import { Observable } from 'rxjs';
import { AnalyticsService } from '@shared/services/analytics.service';
import { PcaFormComponent } from './pca-form/pca-form.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-police-controller-adapter',
  templateUrl: './police-controller-adapter.component.html',
  styleUrls: ['./police-controller-adapter.component.sass']
})
export class PoliceControllerAdapterComponent implements OnInit {
  gridCols = 'grid-cols-1 md:grid-cols-1'
  spanCol1 = 'md:col-span-2'

  videoStates: { [key: string]: { playing: boolean, paused: boolean } } = {};
  videoPlay: Record<string, boolean> = {};
  videoPause: Record<string, boolean> = {};
  api!: VgApiService;
  playerState$!: Observable<string>;
  features: { title: string; text: string; image: string; }[] = [];


  // scriptsLoaded = false;
  // isSubmitting = false;
  // formSubmitted = false;
  // private scriptRefs: HTMLScriptElement[] = [];

  constructor(
    public dialog: MatDialog,
    public translate: TranslateService, 
    private i18nService: I18nServiceService,
    private playerState: PlayerStateService,
    private analytics: AnalyticsService,


    private renderer: Renderer2,
    private http: HttpClient,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,

    ) {
      let lang = localStorage.getItem('currentLang') || 'en';
      translate.setDefaultLang(lang);
      translate.use(lang);
  }




// ngAfterViewInit() {
//   // 2️⃣ Script general (el que usas para configuración adicional)
//   const helperScript = this.renderer.createElement('script');
//   helperScript.src = 'assets/js/zoho-form.js';
//   helperScript.onload = () => console.log('Local Zoho helper loaded');

//   // 3️⃣ Agregarlos al body (en orden)
//   this.renderer.appendChild(document.body, helperScript);
// }

// forceSubmit() {
//   const form = document.getElementById('BiginWebToRecordForm6778134000000950046') as HTMLFormElement;
//   console.log('Force submit', form.action);
//   form.submit();
// }




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

  openDialog() {
    const ref = this.dialog.open(PcaFormComponent, {
      width: '80vw',
      maxWidth: '1200px',
      data: { /* pasar datos si hace falta */ },
    });
    this.analytics.sendEvent('open_modal', {
      category: 'Botón',
      label: 'Abrir formulario PCA'
    });
    ref.afterOpened().subscribe(() => console.log('dialog opened'));
    ref.afterClosed().subscribe(result => console.log('dialog closed', result));
  }
}
