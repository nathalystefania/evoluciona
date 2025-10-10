import { NgModule } from "@angular/core"; 
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser"; 
import { MaterialModule } from "./material.module";
import { MatIconRegistry } from "@angular/material/icon"; 

@NgModule({ 
  imports: [MaterialModule]}) 
  export class IconModule { 
  private path: string = "../../assets/images";
  constructor(
    private domSanitizer: DomSanitizer, 
    public matIconRegistry: MatIconRegistry ) {
    this.matIconRegistry
    .addSvgIcon("icon-facebook", this.setPath(`${this.path}/icon-fb.svg`))
    .addSvgIcon("icon-linkedin", this.setPath(`${this.path}/icon-in.svg`))
    .addSvgIcon("icon-youtube", this.setPath(`${this.path}/icon-yt.svg`))
    .addSvgIcon("icon-download", this.setPath(`${this.path}/icon-download.svg`))
  }
  private setPath(url: string): SafeResourceUrl { 
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url); 
  }
}