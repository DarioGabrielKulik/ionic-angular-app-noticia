import { Component, Input, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { ActionSheetController } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interface';
import { Share } from '@capacitor/share';
import { DataLocalService } from 'src/app/service/data-local.service';
@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent  {

  @Input() noticia!: Article;
  @Input() i!: number;
  @Input() enfavoritos:boolean = false;
  constructor(private actionSheetCtrl: ActionSheetController, private _storage:DataLocalService) {}

  async abrirNoticia(noticia:string){
    await Browser.open({ url: noticia });
  }

 
 
  async onClick() {

    let agregarEliminar;

    if(this.enfavoritos){
      agregarEliminar = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'accion-dark',
        handler: () => {
          this._storage.borrarFavorito(this.noticia);
        },
      }
    }else{
      agregarEliminar = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'accion-dark',
        handler: () => {
          this._storage.guardarNoticias(this.noticia);
        },
      }
    }


    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share-social-outline',
          cssClass: 'accion-dark',
          handler: () => {
            this.compartirNoticia();
          },
        },
        // {
        //   text: 'Favorito',
        //   icon: 'star',
        //   cssClass: 'accion-dark',
        //   handler: () => {
        //     this._storage.guardarNoticias(this.noticia);
        //   },
        // },
        agregarEliminar,
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          cssClass: 'accion-dark',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  async compartirNoticia() {
    await Share.share({
      title: this.noticia.title,
      text: this.noticia.description ?? '',
      url: this.noticia.url,
      dialogTitle: 'Compartir noticia',
    });
  }
}
