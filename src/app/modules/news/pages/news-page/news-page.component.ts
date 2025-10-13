import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/shared/services/news.service';
import { environment as Env } from '@env/environment';


@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.sass']
})
export class NewsPageComponent implements OnInit {

  nCards = 'grid-cols-1 md:grid-cols-3'
  gridCols = 'grid-cols-1 md:grid-cols-6'
  spanCol1 = 'md:col-span-2'
  spanCol2 = 'md:col-span-3'
  startCol2 = 'md:col-start-4'
  
  mockNews: Array<any> = []
  
  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
/*
    this.mockNews = [
      {
        category: 'TECNOLOGIA',
        title: 'Una aplicación movil que podría cambiar la forma en que se realizan todos los tramites de tu ciudad',
        description: 'Esta nueva aplicación permite acceder a toda la información de las comunas desde un smartphone; ofrece múltiples opciones para acceder a los trámites y servicios municipales y a toda la información de la comunidad con tan solo un toque de pantalla.',
        image: './assets/images/ITS_video_media.jpg',
        date: '2021-12-12',
        link: 'https:www.google.com',
      },
      {
        category: 'NEGOCIOS',
        title: 'Juan manda una vez más a sus clientes a revisar sus ideas base',
        description: 'lorem ipsum dolor sit amet cdsdcs lorem ipsum dolor sit amet cdsdcslorem ipsum dolor sit amet cdsdcslorem ipsum dolor sit amet cdsdcs',
        image: '',
        date: '2021-12-12',
        link: '',
      },
      {
        category: 'NOVEDADES',
        title: 'Núestro talento al día, Papí cocina hace otra de las suyas',
        description: '',
        image: '',
        date: '2021-12-12',
        link: '',
      },
    ];
*/

    this.newsService.get().subscribe(
        news => {

          if(news){
            let imageUrl = "";

            for(let story of news.data){
              
              if(story.attributes.Imagen.data)
                imageUrl = Env.imageUrl + story.attributes.Imagen.data[0].attributes.url;
              else
                imageUrl = "";
              

              let storyObject = {
                category: story.attributes.Categoria.data.attributes.Nombre,
                title: story.attributes.Titulo,
                description: story.attributes.Descripcion,
                image: imageUrl,
                date: story.attributes.Fecha,
                link: story.attributes.Link,
              };

              this.mockNews.push(storyObject);

            }
          }
          
        },
        error => {          
          console.error(error);
        }
      );

  }

}
