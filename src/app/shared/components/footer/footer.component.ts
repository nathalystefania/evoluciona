import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {
  mainMenu: { 
    defaultOptions: Array<any>, accessLink: Array<any> }
     = { defaultOptions: [], accessLink: [] 
  }
  
  constructor() { }
  
  ngOnInit(): void {
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
