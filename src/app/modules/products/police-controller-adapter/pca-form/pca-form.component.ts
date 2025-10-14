import { Component, Inject, AfterViewInit, Renderer2 } from '@angular/core';
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
    private analytics: AnalyticsService
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
