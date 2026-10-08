import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { I18nServiceService } from '../../../i18n-service/i18n-service.service';

declare const M: any;
import 'materialize-css/dist/js/materialize.js';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    // INIT MATERIALIZE COMPONENTS
    const dropdowns = document.querySelectorAll('.dropdown-trigger');
    const instancesDrowpdown = M.Dropdown.init(dropdowns, {
      hover: true,
      coverTrigger: false,
      constrainWidth: false,
    });
    var sidenav = document.querySelectorAll('.sidenav');
    var instancesSidenavs = M.Sidenav.init(sidenav, {});
    var collapsible = document.querySelectorAll('.collapsible');
    var instancesCollapsible = M.Collapsible.init(collapsible, {
      accordion: true
    });
  }
  
  cerrarSidenav() {
    const sidenav = document.querySelector('.sidenav');
    if (sidenav) {
      const sidenavInstance = M.Sidenav.getInstance(sidenav);
      sidenavInstance.close();
    }
  }

  mainMenu: { 
    defaultOptions: Array<any>, accessLink: Array<any> }
     = { defaultOptions: [], accessLink: [] 
  }
  
  lang = 'en';
  selectDiv = false;
  
  toggleDiv() {
    this.selectDiv = !this.selectDiv;
  }

  constructor(
    private translate: TranslateService, 
    private i18nService: I18nServiceService,
    private router: Router
    ) {


      this.lang = localStorage.getItem('currentLang') || 'en';
      translate.setDefaultLang(this.lang);
      translate.use(this.lang);

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.selectDiv = false;
      }
    });
  }

  changeLocale(locale: string) {
    this.i18nService.changeLocale(locale);   
  }

  
  ngOnInit(): void {

    this.i18nService.localeEvent.subscribe(locale => this.translate.use(locale));

    this.mainMenu.defaultOptions = [
      {
        name: 'MENU.ABOUT_US',
        router: ['/', '/']
      },
      {
        name: 'MENU.ITS',
        router: ['', 'its-transportation-systems']
      },
      {
        name: 'MENU.TRANSFORMATION_AND_OPERATIONAL_EXCELLENCE',
        router: ['/', '']
      },
      {
        name: 'MENU.INTELLIGENCE_OF_EXPERIENCE_AND_PERFORMANCE',
        router: ['/', '']
      },
      {
        name: 'MENU.GLOBAL_SOURCING',
        router: ['/', 'sourcing-global']
      },
      {
        name: 'MENU.POLICE_CONTROLLER_ADAPTER',
        router: ['products', 'pca']
      },
      {
        name: 'MENU.DEVELOPMENT_&_INNOVATION',
        router: ['/', 'development-innovation']
      },
      {
        name: 'MENU.CLIENTS_&_SUCCESS_STORIES',
        router: ['/', 'clients']
      },
      {
        name: 'MENU.CONTACT',
        router: ['/', 'contact']
      }
    ]
  }

}