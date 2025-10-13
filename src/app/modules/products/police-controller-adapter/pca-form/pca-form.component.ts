import { Component, Inject, AfterViewInit, Renderer2, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-pca-form',
  templateUrl: './pca-form.component.html',
  styleUrls: ['./pca-form.component.sass']
})
export class PcaFormComponent implements AfterViewInit {

  scriptsLoaded = false;
  formSubmitted = false;
  isSubmitting = false;

  constructor(
    public dialogRef: MatDialogRef<PcaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private renderer: Renderer2,
    private http: HttpClient,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    const localScript = this.renderer.createElement('script');
    localScript.src = 'assets/js/zoho-form.js';
    localScript.onload = () => { this.scriptsLoaded = true; };
    this.renderer.appendChild(document.body, localScript);

    const script = this.renderer.createElement('script');
    script.src = 'https://bigin.zoho.com/crm/WebformScriptServlet?rid=f2021906c523c66f8825da50ba06df77f7630e25fe9428586d949eff6237cbe7dd1aa4e99d5ba6165fb8a88be169fe17gidc9d571f274291b4256e8221941eb7c2523544a355756d381c1c2a7410af0f259';
    script.id = 'wf_script';
    this.renderer.appendChild(document.body, script);

    // escuchar el load del iframe para detectar envío completado
    const iframe = document.getElementById('hidden6778134000000950046Frame') as HTMLIFrameElement | null;
    if (iframe) {
      this.renderer.listen(iframe, 'load', () => {
        // la carga final del iframe indica que Zoho respondió -> considerar submit exitoso
        this.ngZone.run(() => {
          this.isSubmitting = false;
          this.formSubmitted = true;
          // ocultar el formParent se hace via *ngIf en la plantilla
          this.cdr.detectChanges();
        });
      });
    }
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (!this.scriptsLoaded) {
      console.warn('Zoho script not loaded yet');
      return;
    }
    // Llamar a la función global que valida y devuelve boolean
    const ok = (window as any).checkMandatory6778134000000950046 ? (window as any).checkMandatory6778134000000950046() : true;
    if (ok) {
       this.ngZone.run(() => {
        this.isSubmitting = true;
        this.cdr.detectChanges();
      });
      // enviar el form manualmente (para respetar target iframe)
      (e.target as HTMLFormElement).submit();

      // fallback: si no llega respuesta en X segundos, ocultar loading
      setTimeout(() => {
        if (this.isSubmitting) {
          this.ngZone.run(() => {
            this.isSubmitting = false;
            this.cdr.detectChanges();
          });
        }
      }, 15000);
    } else {
      console.log('Formulario inválido según Zoho validation');
    }
  }

  close(result?: any) {
    this.dialogRef.close(result);
  }

  onDownloadTechnicalSheet(event: MouseEvent): void {
    if (event) { event.preventDefault(); }

    const assetPath: string = this.data?.technicalSheetPath || '/assets/downloads/ficha-tecnica-PCA.pdf';
    const fileName: string = this.data?.technicalSheetName || assetPath.split('/').pop() || 'ficha-tecnica-PCA.pdf';

    // intenta descargar vía HttpClient para forzar descarga y conservar nombre
    this.http.get(assetPath, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Download failed, fallback to direct navigation', err);
        // fallback: abrir en nueva pestaña para descargar/visualizar
        const a = document.createElement('a');
        a.href = assetPath;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    });
  }
}
