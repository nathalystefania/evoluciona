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
        name: 'ABOUT_US',
        router: ['/', 'home']
      },
      // {
      //   name: 'SERVICES',
      //   router: ['services', 'our-services'],
      //   childrens: [
      //     {
      //       initials: '',
      //       name: 'Sistemas de Transporte ITS',
      //       router: ['services', 'its-transportation-systems']
      //     },
      //     {
      //       initials: '',
      //       name: 'Sourcing Global',
      //       router: ['/', 'services']
      //     },
      //     {
      //       initials: '',
      //       name: 'Aplicaciones Móviles',
      //       router: ['/', 'services']
      //     },
      //     {
      //       initials: '',
      //       name: 'Desarrollo Audiovisual',
      //       router: ['/', 'services']
      //     },
      //     {
      //       initials: '',
      //       name: 'Ingeniería de Negocios',
      //       router: ['/', 'services']
      //     },
      //   ]
      // },
      // {
      //   name: 'PRODUCTS',
      //   router: ['products', 'our-products'],
      //   childrens: [
      //     {
      //       initials: 'TMFE',
      //       name: 'Traffic Monitoring Front End',
      //       router: ['products', 'traffic-monitoring-front-end']
      //     },
      //     {
      //       initials: 'OBO',
      //       name: 'Operational Back Office',
      //       router: ['/', 'products']
      //     },
      //     {
      //       initials: 'CBO',
      //       name: 'Comercial Back Office',
      //       router: ['/', 'products']
      //     },
      //     {
      //       initials: '',
      //       name: 'RepublicApp',
      //       router: ['/', 'products']
      //     },
      //   ]
      // },
      {
        name: 'ITS',
        router: ['', 'its-transportation-systems']
      },
      {
        name: 'GLOBAL_SOURCING',
        router: ['/', 'sourcing-global']
      },
      {
        name: 'DEVELOPMENT_&_INNOVATION',
        router: ['/', 'development-innovation']
      },
      {
        name: 'CLIENTS_&_SUCCESS_STORIES',
        router: ['/', 'clients']
      },
      {
        name: 'NEWS',
        // router: ['/', 'community']
        link: 'https://www.linkedin.com/company/evoluciona-limitada/posts/?feedView=all'
      },
      {
        name: 'CONTACT.TITLE',
        router: ['/', 'contact']
      }
    ]
  }

}