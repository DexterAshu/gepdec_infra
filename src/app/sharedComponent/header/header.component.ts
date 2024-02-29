import { Component, OnInit, HostListener } from '@angular/core';
import { MasterService, AccountService } from 'src/app/_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  docElement!: HTMLElement;
  isFullScreen!: boolean;
  isFullScreenMode: boolean = false;
  storedData: any;
  currentDateTime: any;
  
  constructor(public accountService: AccountService, private masterService: MasterService) {
    this.storedData = this.masterService.getLocalStorage();
   }

  @HostListener('document:fullscreenchange', ['$event'])

  onFullscreenChange(event:any) {
    if (event.currentTarget.fullscreen === false) {
      this.isFullScreenMode = false;
    } else {
      this.isFullScreenMode = true;
    }
  }

  ngOnInit(): void {
    this.docElement = document.documentElement;
    this.toggleFullScreen(); 
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }

  private updateDateTime() {
    const now = new Date();
    this.currentDateTime = now.toLocaleString();
  }

  logout() {
    this.accountService.logout();
  }

  toggleFullScreen() {
    if (this.isFullScreen == true) {
      this.docElement.requestFullscreen();
    }
    else if (this.isFullScreen == false){
      document.exitFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;
  }
}
