import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { I18nServiceService } from 'src/app/i18n-service/i18n-service.service';

declare const M: any;
import 'materialize-css/dist/js/materialize.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

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
    var selects = document.querySelectorAll('.material_select');
    var instancesSelect = M.FormSelect.init(selects);

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

  // const menu = document.getElementById('menu');
  // function toggleMenu(this: any) {
  //     this.menu.classList.toggle('hidden');
  //     this.menu.classList.toggle('w-full');
  //     this.menu.classList.toggle('h-screen');
  // }

  constructor(
    private translate: TranslateService, 
    private i18nService: I18nServiceService,
    private router: Router
    ) {


      this.lang = localStorage.getItem('currentLang') || 'en';
      translate.setDefaultLang(this.lang);
      translate.use(this.lang);

    //translate.setDefaultLang('en');

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
        router: ['/', 'home']
      },
      // {
      //   name: 'MENU.SERVICES',
      //   router: ['services', 'our-services'],
      //   childrens: [
      //     {
      //       initials: '',
      //       name: 'MENU.Sistemas de Transporte ITS',
      //       router: ['services', 'its-transportation-systems']
      //     },
      //     {
      //       initials: '',
      //       name: 'MENU.Sourcing Global',
      //       router: ['/', 'services']
      //     },
      //     {
      //       initials: '',
      //       name: 'MENU.Aplicaciones Móviles',
      //       router: ['/', 'services']
      //     },
      //     {
      //       initials: '',
      //       name: 'MENU.Desarrollo Audiovisual',
      //       router: ['/', 'services']
      //     },
      //     {
      //       initials: '',
      //       name: 'MENU.Ingeniería de Negocios',
      //       router: ['/', 'services']
      //     },
      //   ]
      // },
      // {
      //   name: 'MENU.PRODUCTS',
      //   router: ['products', 'our-products'],
      //   childrens: [
      //     {
      //       initials: 'TMFE',
      //       name: 'MENU.Traffic Monitoring Front End',
      //       router: ['products', 'traffic-monitoring-front-end']
      //     },
      //     {
      //       initials: 'OBO',
      //       name: 'MENU.Operational Back Office',
      //       router: ['/', 'products']
      //     },
      //     {
      //       initials: 'CBO',
      //       name: 'MENU.Comercial Back Office',
      //       router: ['/', 'products']
      //     },
      //     {
      //       initials: '',
      //       name: 'MENU.RepublicApp',
      //       router: ['/', 'products']
      //     },
      //   ]
      // },
      {
        name: 'MENU.ITS',
        router: ['', 'its-transportation-systems']
      },
      {
        name: 'MENU.GLOBAL_SOURCING',
        router: ['/', 'sourcing-global']
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
        name: 'MENU.NEWS',
        // router: ['/', 'community']
        link: 'https://www.linkedin.com/company/evoluciona-limitada/posts/?feedView=all'
      },
      {
        name: 'MENU.CONTACT',
        router: ['/', 'contact']
      }
    ]
  }

}