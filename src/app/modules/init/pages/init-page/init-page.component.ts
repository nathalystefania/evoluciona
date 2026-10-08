import { Component, Input, OnInit, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nServiceService } from 'src/app/i18n-service/i18n-service.service';


import { VgApiService } from '@videogular/ngx-videogular/core';
import { PlayerStateService } from '@shared/services/player-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-init-page',
  templateUrl: './init-page.component.html',
  styleUrls: ['./init-page.component.sass']
})
export class InitPageComponent implements OnInit, OnDestroy {
  
  images: NodeListOf<HTMLImageElement> | undefined;
  intervalId: any;

  nCards = 'grid-cols-1 md:grid-cols-3'
  gridCols = 'grid-cols-1 md:grid-cols-6'
  spanCol1 = 'md:col-span-2'
  spanCol2 = 'md:col-span-4'
  startCol2 = 'md:col-start-3'

  videoPlay: boolean | undefined
  videoPause: boolean | undefined
  api!: VgApiService;
  playerState$!: Observable<string>;
  ourPartners = Array<any>()
  
  @Input() dataCards: Array<any> = []
  @Input() dataLargeCards: Array<any> = []

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


  constructor(
    public translate: TranslateService, 
    private i18nService: I18nServiceService,
    private playerState: PlayerStateService,
    private elRef: ElementRef
    ) {
    //translate.setDefaultLang('en');

      let lang = localStorage.getItem('currentLang') || 'en';
      translate.setDefaultLang(lang);
      translate.use(lang);
      
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  ngOnInit(): void {
    this.i18nService.localeEvent.subscribe(locale => this.translate.use(locale)); 
    this.playerState$ = this.playerState.state$;

    this.images = document.querySelectorAll('.image-container img');
    this.startImageTransition();
    this.ajustarAlturaElemento();

    this.dataCards = [
      {
        image: './assets/images/icons/home/brindamos.svg',
        paragraph: 'WE_PROVIDE'
      },
      {
        image: './assets/images/icons/home/impulsamos.svg',
        paragraph: 'WE_PROMOTE'
      },
      {
        image: './assets/images/icons/home/apoyamos.svg',
        paragraph: 'WE_SUPPORT'
      },
    ]
    this.dataLargeCards = [
      {
        title: 'OUR_SERVICES.CARD1.TITLE',
        text: 'OUR_SERVICES.CARD1.TEXT',
        image: './assets/images/home-servicios/servicios_1.jpg',
      },
      {
        title: 'OUR_SERVICES.CARD2.TITLE',
        text: 'OUR_SERVICES.CARD2.TEXT',
        image: './assets/images/home-servicios/servicios_2.jpg',
      },
      {
        title: 'OUR_SERVICES.CARD3.TITLE',
        text: 'OUR_SERVICES.CARD3.TEXT',
        image: './assets/images/home-servicios/servicios_3.jpg',
      },
    ],

    this.ourPartners = [
      {
        name: 'OUR_PARTNERS.PARTNERS.PARTNER1.NAME',
        position: 'OUR_PARTNERS.PARTNERS.PARTNER1.POSITION',
        text: 'OUR_PARTNERS.PARTNERS.PARTNER1.TEXT',
        image: './assets/images/socios/juan-leon-oros.png',
        in_profile: 'https://www.linkedin.com/in/juan-leon-oros-b1992830/',
      },
      {
        name: 'OUR_PARTNERS.PARTNERS.PARTNER2.NAME',
        position: 'OUR_PARTNERS.PARTNERS.PARTNER2.POSITION',
        text: 'OUR_PARTNERS.PARTNERS.PARTNER2.TEXT',
        image: './assets/images/socios/manuel-vergara-trincado.png',
        in_profile: 'https://www.linkedin.com/in/manuelrodrigovergara/',
      },
      {
        name: 'OUR_PARTNERS.PARTNERS.PARTNER3.NAME',
        position: 'OUR_PARTNERS.PARTNERS.PARTNER3.POSITION',
        text: 'OUR_PARTNERS.PARTNERS.PARTNER3.TEXT',
        image: './assets/images/socios/jorge-vasquez-araya.png',
      },
    ]
    
  }

  startImageTransition(): void {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 10000); // 10 segundos
  }

  nextImage(): void {
    const activeImage = document.querySelector('.image-container img.active') as HTMLImageElement | null;
  
    if (activeImage) {
      activeImage.classList.remove('active');
  
      // Verificar si nextElementSibling y this.images son null o undefined
      const nextSibling = activeImage.nextElementSibling || (this.images && this.images[0]);
  
      if (nextSibling) {
        nextSibling.classList.add('active');
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.ajustarAlturaElemento();
  }

  ajustarAlturaElemento() {
    const slider: HTMLElement = this.elRef.nativeElement.querySelector('#slider-header');
    const alturaVentana = window.innerHeight;
    const nuevaAltura = alturaVentana * 0.7;
    slider.style.height = `${nuevaAltura}px`;
    
    // Obtener todas las imágenes dentro del elemento
    const imagenes: NodeListOf<HTMLImageElement> = slider.querySelectorAll('.slider-image');
    imagenes.forEach(imagen => {
      imagen.style.height = `${nuevaAltura}px`;
    });
  }
  
}
