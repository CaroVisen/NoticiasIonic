import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonSegment , { static: true }) segment: IonSegment;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){
    this.segment.value = this.categorias[0];
    // this.noticiasService.getTopHeadlinesCategoria(this.categorias[0]).subscribe(resp=>{
    //   this.noticias.push(...resp.articles);
    //     });
    this.cargarNoticias(this.categorias[0]);
  }

  cambioCategoria(event){
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(categoria:string){
    this.noticiasService.getTopHeadlinesCategoria(categoria).subscribe(resp=>{
      this.noticias.push(...resp.articles);
        });
  }
}
