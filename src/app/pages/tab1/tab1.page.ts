import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Article, RootObject } from 'src/app/interfaces/interface';

import { NoticiaService } from 'src/app/service/noticia.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  
  noticias: Article[] = [];

  constructor(private _api:NoticiaService) {}
  ngOnInit(){
    this.generateItems();
  }


  private generateItems(event?:any) {
    this._api.getNoticia().subscribe( (resp:RootObject )=> { 
      if(resp.articles.length === 0){
        event.target.disabled = true;
        return
      }
      this.noticias.push(...resp.articles);     
      if(event){
        event.target.complete();
      }
      })   
    
  }

  onIonInfinite(ev:any) {   
    this.generateItems(ev);
  }

}
