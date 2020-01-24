import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  not:any;

  constructor( private storage: Storage) {
    this.cargaFavoritos();
   }

  guardarNoticia(noticia:Article){
    //verifica que la noticia q guardo, no se haya guardado antes
    //busca en el array de noticias si alguna coincide con la que se quiere guardar
    //que seria noticia
    // console.log(this.noticias);
    const existe = this.noticias.find( noti => noti.title === noticia.title );

    if ( !existe ) {
      this.noticias.unshift( noticia );
      this.storage.set('favoritos', this.noticias );
    }
    
    // this.storage.set('favoritos', noticia);
    
    
  }

  async cargaFavoritos(){
    const favoritos = await this.storage.get('favoritos');
    //return this.storage.get('favoritos');
    this.noticias = favoritos;
  }
}
