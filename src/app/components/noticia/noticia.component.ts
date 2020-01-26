import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() enFavoritos;

  constructor( private iab: InAppBrowser, 
    private  actionSheetController: ActionSheetController, 
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService) { }

  ngOnInit() {
  }

  async abrirNoticia(){
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu(){
    let guardarBorrarBoton;
    if(this.enFavoritos){
      guardarBorrarBoton = {
        text: 'Borrar de Favoritos',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.borrarNoticia(this.noticia);
        }
      } 
    }else{
      guardarBorrarBoton = {
        text: 'Agregar a Favoritos',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.guardarNoticia(this.noticia);
        }
      }
    }
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.socialSharing.share(this.noticia.title, this.noticia.source.name, '', this.noticia.url);
        }
      }, 
      guardarBorrarBoton,
      {
        text: 'Cancelar',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

}
