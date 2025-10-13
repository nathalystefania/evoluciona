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
        router: ['/', 'home']
      },
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
