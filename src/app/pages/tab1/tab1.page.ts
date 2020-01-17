import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { RespuestaTopHeadlines, Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){
    this.noticiasService.getTopHeadlines().subscribe( resp => {
      //this.noticias = resp.articles; //con esto inserta todas las noticias en el objeto y se sobreescriben
      this.noticias.push( ...resp.articles ); //los puntos son para que inserte todos los articulos en el array
    });
  }
}
