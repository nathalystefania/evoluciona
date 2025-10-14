import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare let gtag: Function;

export type AnalyticsEventParams = {
  category?: string;   // Ej: 'Botón', 'Descarga', 'Formulario'
  label?: string;      // Nombre descriptivo opcional
  value?: number;      // Valor numérico opcional
  [key: string]: any;  // Otros parámetros personalizados
};

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  constructor() {
    if (environment.gaMeasurementId && environment.production) {
      this.loadAnalytics(environment.gaMeasurementId);
    }
  }

  private loadAnalytics(id: string) {
    if (document.querySelector(`script[src*="${id}"]`)) return;

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    script.async = true;
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
    gtag('js', new Date());
    gtag('config', id, { send_page_view: false });
  }

  /** Envía un page_view */
  public sendPageView(url: string, p0: { page_title: any; }) {
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_path: url,
        page_title: document.title,
      });
    }
  }

  /**
   * Envía un evento personalizado con categoría y parámetros opcionales
   * @param action Nombre del evento (ej: 'login_click', 'purchase')
   * @param params Parámetros opcionales (category, label, value, etc.)
   */
  public sendEvent(action: string, params?: AnalyticsEventParams) {
    if (typeof gtag === 'function') {
      const payload: any = { ...params };
      if (!payload.category) payload.category = 'General';
      gtag('event', action, payload);
    } else {
      console.info(`[AnalyticsService] Evento omitido: ${action}`, params);
    }
  }
}
