import { Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class SeoService {
  private readonly siteName = "Evoluciona";

  private readonly defaultDescription =
    "Conoce Evoluciona, nuestros servicios y soluciones para empresas.";

  constructor(
    private title: Title,
    private meta: Meta,
    private translate: TranslateService,
  ) {}

  /**
   * Actualiza la metadata de acuerdo con la ruta activa.
   * Las rutas hijas tienen prioridad sobre las rutas padre.
   */
  update(snapshot: RouterStateSnapshot): void {
    let route: ActivatedRouteSnapshot | null = snapshot.root;

    let titleKey: string | undefined;
    let seoTitleKey: string | undefined;
    let descriptionKey: string | undefined;

    // Recorre la ruta activa desde la raíz hasta el componente final.
    while (route) {
      if (route.data["title"]) {
        titleKey = route.data["title"];
      }

      if (route.data["seoTitle"]) {
        seoTitleKey = route.data["seoTitle"];
      }

      if (route.data["seoDescription"]) {
        descriptionKey = route.data["seoDescription"];
      }

      route = route.firstChild;
    }

    // Mostrar cambios en consola
    // this.logSeoChanges(seoTitleKey, descriptionKey);

    // Traduce las claves definidas en los archivos i18n.
    const seoTitle = this.resolve(seoTitleKey);
    const regularTitle = this.resolve(titleKey);

    // El título SEO del cliente tiene prioridad.
    const fullTitle =
      seoTitle ||
      (regularTitle ? `${this.siteName} | ${regularTitle}` : this.siteName);

    const description = this.resolve(descriptionKey) || this.defaultDescription;

    // Título del documento.
    this.title.setTitle(fullTitle);

    // Metadata SEO básica.
    this.meta.updateTag(
      {
        name: "description",
        content: description,
      },
      'name="description"',
    );

    // Open Graph.
    this.meta.updateTag(
      {
        property: "og:type",
        content: "website",
      },
      'property="og:type"',
    );

    this.meta.updateTag(
      {
        property: "og:site_name",
        content: this.siteName,
      },
      'property="og:site_name"',
    );

    this.meta.updateTag(
      {
        property: "og:title",
        content: fullTitle,
      },
      'property="og:title"',
    );

    this.meta.updateTag(
      {
        property: "og:description",
        content: description,
      },
      'property="og:description"',
    );

    // Twitter / X Cards.
    this.meta.updateTag(
      {
        name: "twitter:card",
        content: "summary",
      },
      'name="twitter:card"',
    );

    this.meta.updateTag(
      {
        name: "twitter:title",
        content: fullTitle,
      },
      'name="twitter:title"',
    );

    this.meta.updateTag(
      {
        name: "twitter:description",
        content: description,
      },
      'name="twitter:description"',
    );
  }

  /**
   * Obtiene el texto traducido.
   * Si la clave no existe, devuelve una cadena vacía.
   */
  private resolve(key?: string): string {
    if (!key) {
      return "";
    }

    const translated = this.translate.instant(key);

    return typeof translated === "string" && translated !== key
      ? translated
      : "";
  }

  private logSeoChanges(seoTitleKey?: string, descriptionKey?: string): void {
    const title = this.resolve(seoTitleKey);
    const description = this.resolve(descriptionKey);

    console.group("🔎 SEO Metadata");

    console.log("seoTitleKey:", seoTitleKey ?? "Sin definir");
    console.log("Título traducido:", title);

    console.log("descriptionKey:", descriptionKey ?? "Sin definir");
    console.log("Descripción traducida:", description);

    console.groupEnd();
  }
}
