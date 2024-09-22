import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  private _storage: Storage | null = null;
  noticias: Article[] = []

  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  guardarNoticias(noticia:Article){

    const existe = this.noticias.find(noti => noti.title === noticia.title)

    if(!existe){
      this.noticias.unshift(noticia);
      this._storage?.set('favorito', this.noticias);
    }
    
  }

  async cargarFavorito(){
  
    const favo = await this.storage.get('favorito');
    if(favo){
      this.noticias = favo;
    }
    return
  }

  borrarFavorito(noticia:Article){
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title)
    this._storage?.set('favorito', this.noticias);
  }
}
