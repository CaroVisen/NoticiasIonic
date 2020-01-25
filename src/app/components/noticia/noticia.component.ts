import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;

  constructor( private iab: InAppBrowser, private  actionSheetController: ActionSheetController, private socialSharing: SocialSharing) { }

  ngOnInit() {}

  async abrirNoticia(){
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu(){
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.socialSharing.share(this.noticia.title, this.noticia.source.name, '', this.noticia.url);
        }
      }, {
        text: 'Agregar a Favoritos',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }  

}
