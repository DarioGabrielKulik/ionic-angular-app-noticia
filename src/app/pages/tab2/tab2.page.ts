import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article, RootObject } from 'src/app/interfaces/interface';
import { NoticiaService } from 'src/app/service/noticia.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  articulo:Article[] = [];
  @ViewChild(IonSegment) segment!: IonSegment ;
  palabra:string = '';
  categorias: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  constructor(private _api:NoticiaService) {}

  ngOnInit(){ 
    setTimeout(() => {
      this.segment.value = this.categorias[0];
      this.cargarNoticias(this.categorias[0]);
    }, 100);
  }


  category(event:any){  
    this.articulo = [];
    this.cargarNoticias(event.detail.value); 
  }

 

  onIonInfinite(ev:any) {
    this.cargarNoticias(this.palabra, ev);
  }

  cargarNoticias(noticia:string, event?:any){
    this.palabra = noticia

    this._api.getGeneral(noticia).subscribe( (resp:RootObject) => {
      if(resp.articles.length === 0){
        event.target.disabled = true;
        return
      }
      this.articulo.push(...resp.articles);     
      if(event){
        event.target.complete();
      }
      })  
    }


  }

