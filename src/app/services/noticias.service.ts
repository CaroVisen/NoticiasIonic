import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiURL = environment.apiURL;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;
  categoriaActual: string;
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query:string){
    query = apiURL + query;
    return this.http.get<T>(query, {headers});
  }

  getTopHeadlines(){
    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>('/top-headlines?country=us&page='+ this.headlinesPage);
    //return this.http.get<RespuestaTopHeadlines>('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=faf1fc405beb49db8f97387a2ab874ff');
  }

  getTopHeadlinesCategoria(categoria:string){
    if(this.categoriaActual === categoria){
      this.categoriaPage ++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadlines>('/top-headlines?country=us&category='+ categoria + '&page=' + this.categoriaPage);
    //return this.http.get('https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=faf1fc405beb49db8f97387a2ab874ff');
  }
}
