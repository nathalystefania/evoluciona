import { Component, Inject, AfterViewInit, Renderer2, NgZone, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { AnalyticsService } from '@shared/services/analytics.service';

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
    private analytics: AnalyticsService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    window.addEventListener('zohoFormSubmitting', () => {
      this.isSubmitting = true;
    });

    window.addEventListener('zohoFormValidationFailed', () => {
      this.isSubmitting = false;
    });

    window.addEventListener('zohoFormSuccess', () => {
      this.isSubmitting = false;
      this.formSubmitted = true;
    });

    window.addEventListener('zohoFormError', () => {
      this.isSubmitting = false;
      console.error('Error al enviar el formulario Zoho');
    });
  }

  ngAfterViewInit() {
    const helperScript = this.renderer.createElement('script');
    helperScript.src = 'assets/js/zoho-form.js';
    helperScript.defer = true;
    helperScript.onload = () => console.log('Local Zoho helper loaded');

    this.renderer.appendChild(document.body, helperScript);


    // Detectar envío completado al cargar el iframe
    const iframe = document.getElementById('hidden6778134000000950046Frame') as HTMLIFrameElement | null;

    if (iframe) {
      iframe.addEventListener('load', () => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

          // Si el iframe tiene contenido de Zoho, damos por válido el envío
          if (iframeDoc && iframeDoc.body && iframeDoc.body.innerHTML.trim().length > 0) {
            console.log('Zoho form submission detected');
            this.ngZone.run(() => {
              this.isSubmitting = false;
              this.formSubmitted = true;
              this.cdr.detectChanges();
            });
          } else {
            console.warn('Iframe loaded but empty (maybe validation failed?)');
            this.ngZone.run(() => {
              this.isSubmitting = false;
              this.cdr.detectChanges();
            });
          }

          console.log('Zoho iframe response:', iframeDoc?.body?.innerHTML);

        } catch (error) {
          console.error('Error reading Zoho iframe response', error);
          this.ngZone.run(() => {
            this.isSubmitting = false;
            this.cdr.detectChanges();
          });
        }
      });
    }

    // Detectar el inicio del envío
    const form = document.getElementById('BiginWebToRecordFormDiv6778134000000950046') as HTMLFormElement | null;
    if (form) {
      form.addEventListener('submit', () => {
        this.ngZone.run(() => {
          this.isSubmitting = true;
          this.formSubmitted = false;
          this.cdr.detectChanges();
        });
      });
    }
  
  }

  beforeSubmit() {
    this.isSubmitting = true;

    if (!this.scriptsLoaded) {
      console.warn('Zoho script not loaded yet');
      return;
    }

    setTimeout(() => (this.isSubmitting = false), 15000);

    this.analytics.sendEvent('register_click', {
      category: 'Botón',
      label: 'Registro formulario PCA con descarga ficha técnica'
    });
  }

  close(result?: any) {
    this.dialogRef.close(result);
  }

  onDownloadTechnicalSheet(event: MouseEvent, location?: string): void {
    if (event) { event.preventDefault(); }

    this.analytics.sendEvent('download', {
      category: 'Descarga',
      label: 'Descarga ficha PCA técnica' + (location ? ' desde ' + location : '')
    });

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

  ngOnDestroy() {
    window.removeEventListener('zohoFormSubmitting', () => {});
    window.removeEventListener('zohoFormValidationFailed', () => {});
    window.removeEventListener('zohoFormSuccess', () => {});
    window.removeEventListener('zohoFormError', () => {});
  }

}
